# MKG 2026 workshop website

Source for the Multi-dimensional Knowledge Graphs (MKG) workshop website,
ISWC 2026, Bari, Italy (25–26 Oct 2026).
Still under development.

Built with Express + EJS templates and Bootstrap 5 via CDN. There is no
JS bundler — `npm run build` just renders the EJS templates to plain
`.html` files, since Codeberg Pages only serves static files (it cannot
run a live Node server).

## Structure

- `views/partials/` — shared head, nav, footer, included by every page.
- `views/pages/*.ejs` — one file per page (see **Pages & content map** below).
- `server.js` — local dev server (Express + EJS view engine), for live
  preview only. Not deployed.
- `build.js` — renders every page in `views/pages/` to static HTML in
  `public/`. This is what gets deployed.
- `public/assets/` — static assets (logos, EU acknowledgement PNGs, fonts,
  custom CSS). Copied as-is into the build.

## Local development

```sh
npm install
npm run dev       # preview at http://localhost:3000
```

## Build static site

```sh
npm run build      # writes public/*.html
```

## Deploy to Codeberg Pages

Codeberg Pages serves static content from a branch (by default `pages`)
in the repo. This repo is a named project repo
(`https://codeberg.org/aschimmenti/mkg2026`), so once Pages is enabled
the site is served at `https://aschimmenti.codeberg.page/mkg2026/`.
Double-check the exact branch/path conventions against the current
Codeberg Pages docs (docs.codeberg.org) in case they've changed.

> ⚠️ **Base path.** Because the site is served under a subpath
> (`/mkg2026/`), all internal links, asset paths, and font/CSS references
> must be **relative** (or prefixed with `/mkg2026/`), not root-absolute
> (`/style.css` will 404). Set this once in the head partial.

The `deploy` script builds the site and pushes the `public/` folder to
the `pages` branch of the `origin` remote using the `gh-pages` npm
package (works with any git remote, not just GitHub, despite the name):

```sh
npm run deploy
```

Make sure `origin` is set to the Codeberg remote and that you can push
to it (SSH key or token configured) before running this.

---

# Pages & content map

Single-page-with-anchors is fine and preferred (the content is short and
the nav is smoother); the multi-page scaffold also works if you'd rather
split. Either way the **sections/pages and their content are fixed** as
below. Anchor nav order:

1. **Home / Hero** — the statement (see Hero)
2. **Motivation**
3. **Objectives & expected outcomes**
4. **Research questions & engineering challenges**
5. **Expression of Interest** (the form)
6. **Program** *(TBD placeholder)*
7. **Chairs**

Footer (all pages): contact email, INFINITY logo, EU funding
acknowledgement (see Acknowledgements), theme toggle.

---

## Hero (first thing visible on entry)

Direct, above-the-fold. What it is / who it's for / what comes out of it.

> **Multi-dimensional Knowledge Graphs (MKG)**
> A full-day Dagstuhl-Style (Barstuhl) Workshop @ ISWC 2026 · Bari · 25–26 Oct 2026
>
> **MKG as a paradigm for contextual, perspectival, and temporal
> knowledge representation.**
>
> For **logicians, ontology and KG engineers, neuro-symbolic AI
> researchers, and domain practitioners.**
>
> Outcome: a **draft Dagstuhl workshop proposal and a white paper on MKG.**

Make the format obvious in one line: *a discussion-driven workshop — no
formal paper track.*

---

## About / abstract (short, can sit under the hero)

Mainstream Knowledge Graphs (KGs) often assume a monolithic notion of
truth, offering limited support for context-dependent validity,
conflicting viewpoints, knowledge evolution, and concept drift. This
full-day Barstuhl workshop introduces Multi-dimensional Knowledge Graphs
(MKGs) as an umbrella paradigm for contextual, perspectival, and temporal
knowledge representation. It brings together formal and engineering
perspectives to examine key modelling formalisms, scalability challenges,
and reference use cases through lightning pitches and collaborative
breakouts. The main outcome is a community-driven framework document that
will serve as the foundation for an MKG white paper and a potential future
Dagstuhl seminar.

---

## Motivation

KGs are central infrastructures for semantic interoperability, data
integration, and structured knowledge representation across scientific,
cultural, and industrial domains. However, many KG formalisms and
engineering practices still treat statements as if their validity were
independent of the conditions under which they are produced, interpreted,
accepted, revised, or queried. This assumption becomes limiting in domains
where knowledge is contextual, evolving, contested, or perspectival, and
where statements may depend on provenance, temporal scope, epistemic
status, methodological assumptions, community viewpoints, or changing
conceptual frameworks.

The Semantic Web already offers several mechanisms for contextualising
statements — RDF Reification, N-ary Relations, Named Graphs,
RDF-star/RDF 1.2, provenance vocabularies such as PROV-O, Nanopublications,
Wikidata-style qualifiers, Singleton Properties, Temporal Knowledge Graphs,
fluents-based models such as NdFluents, and specific semantics such as
Conjectures. These provide important building blocks but differ in
granularity, semantics, and operational assumptions. The open challenge is
not only how to attach metadata to statements, but how to represent, query,
and reason over the conditions under which statements are valid, applicable,
contested, superseded, perspectival, or meaningful across multiple
heterogeneous dimensions.

**Timeliness.** Although contextual and multi-perspective modelling has
long been considered in Knowledge Engineering, existing solutions often
remain local, pattern-based, or tied to specific modelling tasks. A
community-wide re-evaluation is timely because KGs increasingly ground
neuro-symbolic systems and Retrieval-Augmented Generation, while current
symbolic representations still struggle to expose provenance boundaries,
temporal scope, disagreement, and concept drift. The community addresses
related problems through fragmented notions such as contexts, perspectives,
layers, lenses, views, and possible worlds. MKGs offer an umbrella concept
for comparing these strands and identifying the trade-off between formal
expressivity and scalable storage/query execution.

**Why a Barstuhl format.** This agenda is best developed through an
interactive format rather than standard paper presentations. The workshop
uses lightning talks, breakouts, and plenary synthesis to bring
foundational, database, neuro-symbolic, and domain perspectives into direct
dialogue and to produce a shared roadmap for future MKG research.

---

## Objectives & expected outcomes

The workshop serves as a collaborative incubator to produce a
community-drafted manifesto and framework document. This document is the
immediate foundation for a co-authored **White Paper on Multi-dimensional
Knowledge Graphs**, capturing a unified set of research questions, concrete
engineering challenges, and pragmatic, cross-domain reference use cases. It
will be shared through the workshop website, Zenodo, and/or an open
collaborative repository, and may form the basis for a future **Dagstuhl
seminar proposal.**

---

## Research questions & engineering challenges

**Foundational track**

- **RQ1 — Formal foundations.** What minimal, sound formalisms can natively
  represent multi-dimensional assertions (time, perspective, stance) while
  preserving W3C backward compatibility?
- **RQ2 — Epistemological alignment.** How can we align divergent,
  contradictory dimensions or conflicting ontologies within the same graph
  without triggering logical inconsistency?
- **RQ3 — Concept drift.** What formalisms let a model track and query the
  historical evolution of a concept's meaning over time without schema
  fragmentation?

**Computational track**

- **EC1 — Query & storage.** How should query languages, storage models,
  and indexing strategies evolve to efficiently support querying over
  multiple contextual dimensions?
- **EC2 — Scalable evolution.** How can storage engines efficiently manage
  temporal evolution, concept drift, and multiple graph versions without
  excessive data duplication or query overhead?
- **EC3 — Interoperability & AI.** How can multi-dimensional KGs provide a
  scalable symbolic foundation for neuro-symbolic AI, Retrieval-Augmented
  Generation, and other AI systems while preserving contextual semantics?

---

## Program *(TBD)*

Mark this section as tentative. Provisional shape from the proposal:

- **90 min — Plenary pitch session.** Selected lightning pitches balancing
  the theoretical/logician and engineering/database perspectives.
- **180 min — Breakout working sessions.** Three parallel pillars —
  (a) Reference Use Cases, (b) Engineering Challenges, (c) Foundational
  Models — run as three 60-min rounds with participant reshuffling; each
  group drafts sections of the community document.
- **60–90 min — Alignment & synthesis plenary.** Reconcile breakout
  outputs, resolve friction, set the roadmap and writing assignments for
  the White Paper.

Render as "provisional — full schedule to follow."

---

## Chairs

Five chairs; show name, affiliation, one-line bio, email, homepage link.
Emphasise the multi-institution, junior/senior mix.

- **Lyndon Nixon** — Storypact GmbH & Modul University Vienna, Austria.
  CIO at Storypact and Associate Professor in Applied Data Science; works
  on knowledge modelling, AI-based extraction, and multimodal understanding.
  Email: nixon@storypact.com / lyndon.nixon@modul.ac.at.
  Homepage: https://research.modul.ac.at/en/persons/lyndon-nixon/
- **Valentina Presutti** — University of Bologna, Italy. Associate Professor
  in Semantic Web and Knowledge Graphs; co-founded WOP, co-directs ISWS,
  co-organised Dagstuhl Seminar 18371 on Knowledge Graphs.
  Email: valentina.presutti@unibo.it. Homepage: `[TODO]`
- **Disha Purohit** — Leibniz University Hannover (LUH), Germany.
  Postdoctoral researcher in the VolkswagenStiftung Zukunft.niedersachsen
  Program CAIMed; works on Data & Knowledge Engineering, KGs,
  neuro-symbolic AI, and explainable AI.
  Email: disha.purohit@tib.eu. Homepage: `[TODO]`
- **Andrea Schimmenti** — University of Bologna, Italy. Postdoctoral
  researcher in the Horizon Europe project INFINITY; Semantic Web
  technologies and NLP for ontology-driven KG extraction, especially
  scholarly interpretations and debate representation.
  Email: andrea.schimmenti2@unibo.it. Homepage: `[TODO]`
- **Maria-Esther Vidal** — LUH, TIB & L3S, Germany. Professor and Head of
  the Scientific Data Management Group; works on KGs, data integration, and
  neuro-symbolic AI.
  Email: maria.vidal@tib.eu. Homepage: `[TODO]`

---

# Expression of Interest (EoI) form

A single lightweight form. It has **three progressive tiers**: base fields
are always shown; the working-group checklist appears if the user picks
"attend" and/or "propose a talk"; the full lightning-talk block appears
only if they pick "propose a talk". Wire the conditional reveal client-side.

### Tier 1 — always shown
- First name *(required)*
- Last name *(required)*
- Email *(required)*
- **Interest** — multi-select, one or more:
  1. Receive updates on workshop results (white paper, report, etc.)
  2. Attend the workshop
  3. Propose a lightning talk

### Tier 2 — show if **2** and/or **3** selected
- **Working groups of interest** — checkboxes, any number:
  - **(a)** Formal models for multi-dimensional assertions and conflicting viewpoints
  - **(b)** Designing scalable query, storage, and indexing strategies
  - **(c)** Benchmarks and representative use cases

### Tier 3 — show only if **3 (propose a lightning talk)** selected
- **Topics the abstract most touches** — same (a)/(b)/(c) checklist, any number
- **Title** *(required in this tier)*
- **5 keywords** *(required)*
- **Abstract** — free text, **max 300 words** (show a live word counter; hard cap)
- **References** — **max 3**; prefer journal or main-conference papers.
  Helper text next to the field: *"Please prefer journal or main
  conference papers, max 3."* Ask for **BibTeX** (a textarea is fine).

### Notices shown on the form
- **Selection notice:** lightning talks will be **selected** for
  presentation (limited slot). **All accepted abstracts will be published**
  on the site and in any workshop proceedings/report.
- **Consent — data collection** *(required checkbox)*: consent to store the
  submitted personal data, used only for workshop-related communications.
- **Consent — INFINITY newsletter** *(separate, optional checkbox)*: consent
  to be added to the INFINITY project newsletter.

> ⚠️ Keep the two consents as **two distinct, unbundled checkboxes**
> (GDPR): workshop-comms consent is required to submit; the INFINITY
> newsletter consent is optional and must default to unchecked. Do not
> merge them.

### Form backend `[TODO — decide]`
The static build can't process POSTs. Options, in order of least effort:
- **Formspree / Formcap / Codeberg-friendly form relay** → email/JSON out,
  no server. Simplest.
- **Google Form embed** → free, but its conditional logic is clunky for the
  three-tier reveal and BibTeX; workable but uglier.
- **Small serverless endpoint** (e.g. a Function) if you want full control
  over storage and the branching UX.
Recommendation: custom HTML form (so the three-tier logic and 300-word/3-ref
caps behave exactly as specced) POSTing to a form relay.

---

# Design system

Reuse the **INFINITY** brand (media kit). Assets to drop into
`public/assets/`: logos, fonts, EU acknowledgement PNGs.

## Palette (exact, sampled from the media kit)

```
--ink:            #282828   /* near-black base            */
--paper:          #F0F0F0   /* off-white base (#EBEBEB alt) */
--accent-yellow:  #FFDB63   /* PRIMARY accent (INFINITY gold) */
--accent-purple:  #B58CD6
--accent-green:   #6EBA8C
--accent-pink:    #EB6E8C
```

Concept: **black/white base, colored accents on top.** Yellow is the
primary accent; purple/green/pink are secondary. Nice reuse: map the three
working groups / breakout pillars to the three secondary accents so they're
colour-coded consistently across the Topics section and the EoI checkboxes,
e.g. **(a) → purple, (b) → green, (c) → pink** (mapping is flexible, keep it
consistent once chosen).

> ⚠️ **Contrast.** `#FFDB63` on white fails WCAG for normal-size text. Use
> yellow for large display type, section rules/underlines, and as a
> **background** behind dark (`--ink`) text on buttons/badges — never for
> small body text on a light background. On the dark theme, yellow text on
> `--ink` is fine. Check the three secondary accents for AA on whichever
> surface they sit on and darken slightly if needed.

## Light / dark theme

Bootstrap 5.3 has native colour modes — use `data-bs-theme="light|dark"` on
`<html>` and drive everything from CSS variables so one toggle flips the
whole site.

- **Light:** background `--paper`, text `--ink`, accents as above.
- **Dark:** background `--ink`, text `--paper`, accents as above (they pop).
- Persist the choice in `localStorage`; respect
  `prefers-color-scheme` on first visit.
- Swap the logo/EU PNGs to the matching light/dark variant on theme change
  (the media kit ships both — see below).

## Typography

- **Primary: Roboto** — body, UI, nav.
- **Secondary: Instrument Serif** — display headings and italic accents
  (matches the INFINITY `infinity` wordmark / serif taglines).

> ⚠️ **Load fonts self-hosted, not from the Google Fonts CDN.** Serving
> Google Fonts from Google's CDN leaks visitor IPs to a third party and has
> been ruled a GDPR violation in the EU (we're EU-based and collecting
> consent anyway). Download the Roboto and Instrument Serif `.woff2` files
> into `public/assets/fonts/` and `@font-face` them locally. Both are open
> licensed (Apache 2.0 / OFL) so self-hosting is fine.

## Logos & acknowledgements

From the media kit, both **light and dark** variants exist for each logo —
use the variant that matches the active theme.

- INFINITY logo (icon + wordmark).
- INFINITY + Echoes lockups (vertical / horizontal) — optional.
- **EU emblem + funding statement PNG** ("European Commission claim" in the
  kit). Place in the footer on every page.

**EU acknowledgement** — use the provided PNG. Grant number for
alt text / fallback caption: **Horizon Europe, Grant Agreement No.
101233051** (project INFINITY). Standard fallback wording if a text version
is needed:

> Funded by the European Union. Views and opinions expressed are those of
> the author(s) only and do not necessarily reflect those of the European
> Union or the granting authority. Neither the European Union nor the
> granting authority can be held responsible for them.
> (Verify the exact wording against the media-kit PNG before publishing.)

---

# Still genuinely open (needs a human decision, not just content)

- **Lightning-talk / EoI deadline** + notification date (suggest deadline
  2–4 weeks before 25 Oct).
- **Form backend** choice (see EoI → Form backend).
- **Chair homepage links** for Presutti, Purohit, Schimmenti, Vidal.
- **Workshop contact email** for the footer/contact.
- **Link to ISWC 2026 registration** (note attendance needs a Pre-conference
  Days ticket: 250 € add-on for main-conference registrants, or 350 €
  standalone; both +22% VAT).
- **Working-group → accent-colour mapping** (pick once, apply everywhere).
- **INFINITY branding scope** — confirm how prominently to co-brand vs. keep
  it to fonts/palette + the required EU acknowledgement.