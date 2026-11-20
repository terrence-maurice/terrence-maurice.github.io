/* Třpytivé pozadí (p5.js): černé zrno + stříbrné a tmavě modré flitry, které se lesknou při scrollování.
   Glitter background (p5.js): black grain + silver and dark-blue flakes that catch the light as you scroll. */
(function () {
  'use strict';
  if (typeof p5 === 'undefined') return;
  var host = document.getElementById('glitter');
  if (!host) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // near-black grain shades (slight cool drift) and flake colours
  var BLACK = [[4, 4, 5], [7, 7, 9], [10, 10, 12], [13, 13, 16], [6, 6, 8], [16, 16, 20]];
  var SILVER = [[236, 240, 246], [212, 218, 228], [190, 197, 210], [168, 178, 196]];
  var BLUE = [[34, 64, 168], [24, 48, 140], [46, 84, 196], [18, 38, 112]];   // dark blue

  new p5(function (p) {
    var base, flakes = [], W, H, lastY = 0, energy = 0, resizeTimer = null;

    function buildBase() {
      base = p.createGraphics(W, H);
      base.pixelDensity(1);
      base.loadPixels();
      var px = base.pixels, cell = 2;
      for (var y = 0; y < H; y += cell) {
        for (var x = 0; x < W; x += cell) {
          var c, r = Math.random();
          if (r < 0.016) {                       // faint silver / dark-blue speck in the grain
            c = r < 0.011 ? SILVER[(Math.random() * SILVER.length) | 0] : BLUE[(Math.random() * BLUE.length) | 0];
            var k = 0.35 + Math.random() * 0.25;
            c = [c[0] * k, c[1] * k, c[2] * k];
          } else {
            c = BLACK[(Math.random() * BLACK.length) | 0];
            var j = 0.7 + Math.random() * 0.6;    // brightness jitter = glitter grain (stays near-black for text contrast)
            c = [c[0] * j, c[1] * j, c[2] * j];
          }
          for (var dy = 0; dy < cell && y + dy < H; dy++) {
            for (var dx = 0; dx < cell && x + dx < W; dx++) {
              var i = 4 * ((y + dy) * W + (x + dx));
              px[i] = c[0]; px[i + 1] = c[1]; px[i + 2] = c[2]; px[i + 3] = 255;
            }
          }
        }
      }
      base.updatePixels();
    }

    function buildFlakes() {
      flakes = [];
      var n = Math.round(Math.min(1400, (W * H) / 1800));
      for (var i = 0; i < n; i++) {
        var silver = Math.random() < 0.66;
        var pal = silver ? SILVER : BLUE;
        flakes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          a: Math.random() * Math.PI * 2,          // facet orientation
          s: 1 + Math.random() * 2.4,               // size
          rot: Math.random() * Math.PI,
          c: pal[(Math.random() * pal.length) | 0],
          silver: silver
        });
      }
    }

    function setupSize() {
      W = Math.max(1, p.windowWidth); H = Math.max(1, p.windowHeight);   // a hidden/0-px window must not crash buildBase
      buildBase(); buildFlakes();
    }

    p.setup = function () {
      p.pixelDensity(1);
      var c = p.createCanvas(p.windowWidth, p.windowHeight);
      c.parent(host);
      c.elt.setAttribute('aria-hidden', 'true');
      p.noStroke();
      setupSize();
      lastY = window.scrollY;
      if (reduce) { p.noLoop(); }
    };

    p.windowResized = function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        setupSize();
        p.redraw();
      }, 150);
    };

    p.draw = function () {
      var sy = window.scrollY;
      var dy = sy - lastY; lastY = sy;
      energy = Math.min(1, energy * 0.94 + Math.min(Math.abs(dy), 90) / 220);

      // grain scrolls slowly with the page (parallax), tiled vertically
      var off = ((sy * 0.25) % H + H) % H;
      p.image(base, 0, -off);
      p.image(base, 0, H - off);

      // light direction sweeps with scroll position and time -> flakes flash
      var t = p.millis() / 1000;
      var light = t * 0.22 + sy * 0.0045;
      var sharp = 26 - energy * 16;                 // wider highlight while scrolling = more sparkle
      var gain = 0.55 + energy * 0.45;
      var glintAt = 0.7 - energy * 0.22;           // more star glints while scrolling
      var foff = ((sy * 0.4) % H + H) % H;

      for (var i = 0; i < flakes.length; i++) {
        var f = flakes[i];
        var g = Math.cos(f.a - light + Math.sin(t * 0.7 + f.x * 0.01) * 0.25);
        if (g <= 0) continue;
        g = Math.pow(g, sharp) * gain;
        if (g < 0.04) continue;
        var y = f.y - foff; if (y < 0) y += H;
        var a = Math.min(255, g * 255);
        p.fill(f.c[0], f.c[1], f.c[2], a);
        p.push();
        p.translate(f.x, y);
        p.rotate(f.rot);
        p.rect(-f.s / 2, -f.s / 2, f.s, f.s);
        p.pop();
        // brightest silver flakes get a small star glint
        if (f.silver && g > glintAt) {
          var L = f.s * (3 + g * 4);
          p.stroke(240, 244, 250, a * 0.75);
          p.strokeWeight(0.8);
          p.line(f.x - L, y, f.x + L, y);
          p.line(f.x, y - L, f.x, y + L);
          p.noStroke();
          p.fill(255, 255, 255, a * 0.18);
          p.circle(f.x, y, L * 0.9);
        }
      }
    };

    document.addEventListener('visibilitychange', function () {
      if (reduce) return;
      if (document.visibilityState === 'visible') p.loop(); else p.noLoop();
    });
  });
})();
