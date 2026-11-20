/* Jiskřivé pozadí: hvězdičky se rozzáří a přibývají při scrollování dolů.
   Sparkling background: glints brighten and multiply as you scroll down. */
(function () {
  'use strict';
  var canvas = document.getElementById('sparkle');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var COLORS = ['255,255,255', '255,255,255', '214,204,255', '185,160,255', '150,205,255', '255,214,140'];
  var W = 0, H = 0, DPR = 1, stars = [], glints = [];
  var lastY = window.scrollY, velocity = 0, energy = 0, t = 0, running = true;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function makeStar() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      z: rand(0.15, 1),                // depth -> parallax + size
      r: rand(0.4, 1.4),
      phase: Math.random() * Math.PI * 2,
      speed: rand(0.6, 2.2),
      c: COLORS[(Math.random() * COLORS.length) | 0],
      depthGate: Math.random()         // stars with a high gate only appear further down the page
    };
  }

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    var n = Math.round(Math.min(320, (W * H) / 5200));
    stars = []; for (var i = 0; i < n; i++) stars.push(makeStar());
  }

  function progress() {
    var max = document.documentElement.scrollHeight - H;
    return max > 0 ? Math.min(1, window.scrollY / max) : 0;
  }

  function spawnGlint() {
    glints.push({ x: Math.random() * W, y: Math.random() * H, life: 0, max: rand(40, 90), size: rand(4, 11), c: COLORS[(Math.random() * COLORS.length) | 0] });
  }

  function drawCross(x, y, s, a, c) {
    var g = ctx.createRadialGradient(x, y, 0, x, y, s * 1.6);
    g.addColorStop(0, 'rgba(' + c + ',' + (a * 0.55) + ')');
    g.addColorStop(1, 'rgba(' + c + ',0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, s * 1.6, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(' + c + ',' + a + ')';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(x - s, y); ctx.lineTo(x + s, y);
    ctx.moveTo(x, y - s); ctx.lineTo(x, y + s);
    ctx.stroke();
  }

  function frame() {
    if (!running) return;
    t += 1 / 60;
    var y = window.scrollY;
    var dy = y - lastY; lastY = y;
    velocity = velocity * 0.9 + Math.abs(dy) * 0.1;
    energy = Math.min(1, energy * 0.96 + Math.min(Math.abs(dy), 80) / 400);
    var p = progress();

    ctx.clearRect(0, 0, W, H);

    // visible share of stars grows from 35 % at the top to 100 % at the bottom
    var visibleShare = 0.35 + 0.65 * p;
    var base = 0.18 + 0.32 * p;

    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      if (s.depthGate > visibleShare) continue;
      var sy = ((s.y - y * s.z * 0.35) % H + H) % H;
      var tw = 0.5 + 0.5 * Math.sin(t * s.speed * (1 + energy * 2.5) + s.phase);
      var a = Math.min(1, (base + energy * 0.7) * (0.25 + 0.75 * tw * tw));
      var r = s.r * (0.6 + s.z * 0.7) * (1 + energy * 0.6);
      if (r > 1.25 && tw > 0.9 && (energy > 0.15 || p > 0.5)) {
        drawCross(s.x, sy, r * 3.2, a, s.c);
      } else {
        ctx.fillStyle = 'rgba(' + s.c + ',' + a + ')';
        ctx.beginPath(); ctx.arc(s.x, sy, r, 0, Math.PI * 2); ctx.fill();
      }
    }

    // extra glints while scrolling
    if (Math.random() < energy * 0.9) spawnGlint();
    for (var j = glints.length - 1; j >= 0; j--) {
      var g = glints[j]; g.life++;
      var k = g.life / g.max;
      if (k >= 1) { glints.splice(j, 1); continue; }
      var ga = Math.sin(k * Math.PI);
      drawCross(g.x, g.y - k * 12, g.size * (0.6 + ga * 0.6), ga * 0.85, g.c);
    }

    requestAnimationFrame(frame);
  }

  function drawStatic() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      ctx.fillStyle = 'rgba(' + s.c + ',' + (0.15 + 0.35 * s.z) + ')';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 0.8, 0, Math.PI * 2); ctx.fill();
    }
  }

  resize();
  window.addEventListener('resize', function () { resize(); if (reduce) drawStatic(); });

  if (reduce) { drawStatic(); return; }

  document.addEventListener('visibilitychange', function () {
    var vis = document.visibilityState === 'visible';
    if (vis && !running) { running = true; lastY = window.scrollY; requestAnimationFrame(frame); }
    else if (!vis) running = false;
  });
  requestAnimationFrame(frame);
})();
