(function () {
  'use strict';

  /* ---------------- Theme toggle ---------------- */
  var STORAGE_KEY = 'mkg2026-theme';
  var root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-bs-theme', theme);
    document.querySelectorAll('[data-theme-logo]').forEach(function (img) {
      var variant = theme === 'dark' ? img.getAttribute('data-src-dark') : img.getAttribute('data-src-light');
      if (variant) img.setAttribute('src', variant);
    });
  }

  function currentPreferredTheme() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  applyTheme(currentPreferredTheme());

  document.addEventListener('click', function (event) {
    var btn = event.target.closest('.theme-toggle');
    if (!btn) return;
    var next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  });

  /* ---------------- Scrollspy: highlight the nav link(s) for the visible section ---------------- */
  /* Both the top navbar and the side-dot nav share [data-nav-link], so several
     elements can point at the same #id — match by href, not a 1:1 lookup. */
  var navLinks = document.querySelectorAll('[data-nav-link]');
  if (navLinks.length) {
    var sections = Array.prototype.slice.call(document.querySelectorAll('[id]')).filter(function (el) {
      return Array.prototype.some.call(navLinks, function (l) {
        return l.getAttribute('href') === '#' + el.id;
      });
    });

    var setActive = function (id) {
      navLinks.forEach(function (l) {
        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
      });
    };

    if ('IntersectionObserver' in window && sections.length) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) setActive(entry.target.id);
          });
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
      );
      sections.forEach(function (section) { observer.observe(section); });
    }
  }

  /* ---------------- Back-to-top button ---------------- */
  var backToTop = document.getElementById('back-to-top');
  var footer = document.querySelector('.site-footer');
  if (backToTop && footer) {
    if ('IntersectionObserver' in window) {
      var footerObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            backToTop.classList.toggle('show', entry.isIntersecting);
          });
        },
        { threshold: 0.05 }
      );
      footerObserver.observe(footer);
    }
    backToTop.addEventListener('click', function () {
      var top = document.getElementById('top');
      if (top) top.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------------- EoI form (cfp page) ---------------- */
  var form = document.getElementById('eoi-form');
  if (!form) return;

  var interestChecks = form.querySelectorAll('input[name="interest"]');
  var tier2 = document.getElementById('eoi-tier2');
  var tier3 = document.getElementById('eoi-tier3');
  var talkCheckbox = form.querySelector('input[name="interest"][value="talk"]');

  function setRequired(container, isRequired) {
    if (!container) return;
    container.querySelectorAll('[data-required-in-tier]').forEach(function (field) {
      if (isRequired) {
        field.setAttribute('required', 'required');
      } else {
        field.removeAttribute('required');
      }
    });
  }

  function updateTiers() {
    var anyChecked = Array.prototype.some.call(interestChecks, function (c) {
      return c.checked && (c.value === 'attend' || c.value === 'talk');
    });
    var talkChecked = talkCheckbox && talkCheckbox.checked;

    tier2.classList.toggle('d-none', !anyChecked);
    tier3.classList.toggle('d-none', !talkChecked);
    setRequired(tier3, talkChecked);
  }

  interestChecks.forEach(function (c) {
    c.addEventListener('change', updateTiers);
  });
  updateTiers();

  /* Abstract word counter, hard-capped at 300 words */
  var abstractField = document.getElementById('eoi-abstract');
  var abstractCounter = document.getElementById('eoi-abstract-counter');
  var MAX_WORDS = 300;

  function wordsOf(text) {
    return text.trim().length ? text.trim().split(/\s+/) : [];
  }

  if (abstractField && abstractCounter) {
    abstractField.addEventListener('input', function () {
      var words = wordsOf(abstractField.value);
      if (words.length > MAX_WORDS) {
        abstractField.value = words.slice(0, MAX_WORDS).join(' ');
        words = wordsOf(abstractField.value);
      }
      abstractCounter.textContent = words.length + ' / ' + MAX_WORDS + ' words';
      abstractCounter.classList.toggle('over-limit', words.length >= MAX_WORDS);
    });
  }

  /* References (BibTeX) soft counter, max 3 entries */
  var refsField = document.getElementById('eoi-references');
  var refsCounter = document.getElementById('eoi-references-counter');
  var MAX_REFS = 3;

  function countBibEntries(text) {
    var matches = text.match(/@\w+\s*\{/g);
    return matches ? matches.length : 0;
  }

  if (refsField && refsCounter) {
    refsField.addEventListener('input', function () {
      var n = countBibEntries(refsField.value);
      refsCounter.textContent = n + ' / ' + MAX_REFS + ' references detected';
      refsCounter.classList.toggle('over-limit', n > MAX_REFS);
    });
  }

  /* Submit: validate at-least-one-interest + refs cap, then hand off to the relay */
  var statusBox = document.getElementById('eoi-status');
  var ENDPOINT = form.getAttribute('data-endpoint');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    statusBox.classList.add('d-none');
    statusBox.classList.remove('alert-danger', 'alert-success');

    var anyInterest = Array.prototype.some.call(interestChecks, function (c) {
      return c.checked;
    });
    if (!anyInterest) {
      statusBox.textContent = 'Please select at least one option under "Interest".';
      statusBox.classList.remove('d-none');
      statusBox.classList.add('alert-danger');
      return;
    }

    if (refsField && countBibEntries(refsField.value) > MAX_REFS) {
      statusBox.textContent = 'Please list at most ' + MAX_REFS + ' references.';
      statusBox.classList.remove('d-none');
      statusBox.classList.add('alert-danger');
      return;
    }

    if (!form.reportValidity()) return;

    if (!ENDPOINT || ENDPOINT.indexOf('REPLACE_ME') !== -1) {
      statusBox.textContent = 'The form backend is not connected yet (placeholder endpoint). Your response was not sent — please email the chairs directly for now.';
      statusBox.classList.remove('d-none');
      statusBox.classList.add('alert-danger');
      return;
    }

    var data = new FormData(form);
    fetch(ENDPOINT, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
      .then(function (res) {
        if (res.ok) {
          statusBox.textContent = 'Thank you — your expression of interest was submitted.';
          statusBox.classList.remove('d-none');
          statusBox.classList.add('alert-success');
          form.reset();
          updateTiers();
        } else {
          throw new Error('Submission failed');
        }
      })
      .catch(function () {
        statusBox.textContent = 'Something went wrong sending the form. Please email the chairs directly.';
        statusBox.classList.remove('d-none');
        statusBox.classList.add('alert-danger');
      });
  });
})();
