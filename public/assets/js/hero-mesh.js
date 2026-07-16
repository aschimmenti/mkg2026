(function () {
  'use strict';

  var canvas = document.getElementById('hero-mesh');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var CFG = {
    cols: 56,        // vertical lines - 1
    rows: 30,        // horizontal lines - 1
    spanX: 3.6,       // world half-width
    spanY: 2.1,       // world half-depth
    amp: 0.32,        // travelling-wave amplitude (rolling-hill height)
    speed: 0.34,      // radians per second
    tilt: 1.05,       // camera pitch (radians) — low, raking angle over the terrain
    focal: 3.0,
    camDist: 4.2,
    lineWidth: 1
  };

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var w = 0, h = 0, dpr = 1, running = true, raf = null, t0 = performance.now();
  var rgb = [40, 40, 40], alpha = 0.35;

  function readThemeColor() {
    var styles = getComputedStyle(document.documentElement);
    var color = styles.getPropertyValue('--bs-body-color').trim();
    var a = parseFloat(styles.getPropertyValue('--mesh-alpha'));
    rgb = hexToRgb(color) || rgb;
    alpha = isNaN(a) ? alpha : a;
  }

  function hexToRgb(hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return null;
    return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // rolling, hill-like surface height at world (x, y) and time t —
  // several travelling sine fields crossing at different angles/speeds,
  // rather than one static bend, so the terrain keeps reshaping as it moves.
  function surfaceHeight(x, y, t) {
    var wave =
      Math.sin(x * 1.3 + t) * 0.4 +
      Math.sin(x * 0.5 - y * 0.9 + t * 0.65) * 0.32 +
      Math.sin(y * 1.6 + t * 0.85) * 0.22 +
      Math.sin((x + y) * 0.75 - t * 1.1) * 0.26;
    return CFG.amp * wave;
  }

  function frame(now) {
    var t = reduced ? 0 : (now - t0) / 1000 * CFG.speed * Math.PI;
    var cosA = Math.cos(CFG.tilt), sinA = Math.sin(CFG.tilt);
    var scale = Math.max(w, h) * 0.34;
    var cx = w * 0.62, cy = h * 0.5;

    var P = [];
    var i, j;
    for (j = 0; j <= CFG.rows; j++) {
      var y = (j / CFG.rows * 2 - 1) * CFG.spanY;
      var row = [];
      for (i = 0; i <= CFG.cols; i++) {
        var x = (i / CFG.cols * 2 - 1) * CFG.spanX;
        var z = surfaceHeight(x, y, t);
        var yr = y * cosA - z * sinA;
        var zr = y * sinA + z * cosA;
        var f = CFG.focal / (CFG.camDist + zr);
        row.push({ sx: cx + x * f * scale, sy: cy + yr * f * scale, d: f });
      }
      P.push(row);
    }

    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = CFG.lineWidth;
    ctx.lineJoin = 'round';

    var stroke = function (pts) {
      var mid = pts[Math.floor(pts.length / 2)];
      var a = alpha * Math.min(1, Math.max(0.12, (mid.d - 0.45) * 1.9));
      ctx.strokeStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + a.toFixed(3) + ')';
      ctx.beginPath();
      ctx.moveTo(pts[0].sx, pts[0].sy);
      for (var k = 1; k < pts.length; k++) ctx.lineTo(pts[k].sx, pts[k].sy);
      ctx.stroke();
    };

    for (j = 0; j <= CFG.rows; j++) stroke(P[j]);
    for (i = 0; i <= CFG.cols; i++) {
      var col = [];
      for (j = 0; j <= CFG.rows; j++) col.push(P[j][i]);
      stroke(col);
    }

    if (running && !reduced) raf = requestAnimationFrame(frame);
  }

  function start() {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(frame);
  }

  new ResizeObserver(function () { resize(); start(); }).observe(canvas);

  document.addEventListener('visibilitychange', function () {
    running = !document.hidden;
    if (running) start(); else cancelAnimationFrame(raf);
  });

  new IntersectionObserver(function (entries) {
    running = entries[0].isIntersecting;
    if (running) start(); else cancelAnimationFrame(raf);
  }, { threshold: 0 }).observe(canvas);

  // re-tint the mesh when the light/dark toggle flips --bs-body-color
  new MutationObserver(function () {
    readThemeColor();
    if (reduced) start();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-bs-theme'] });

  readThemeColor();
  resize();
  start();
})();
