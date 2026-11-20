/* Třpytivé pozadí (p5.js): černé zrno + stříbrné a tmavě modré flitry, které se lesknou při scrollování
   a reagují na hrající nahrávku ze Zvuků Izmiru (assets/sound.js).
   Glitter background (p5.js): black grain + silver and dark-blue flakes that catch the light as you scroll
   and react to the playing Sounds of Izmir recording (assets/sound.js). */
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
    var base, flakes = [], W, H, lastY = 0, energy = 0, swirl = 0, resizeTimer = null;

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

      // sound (Zvuky Izmiru, assets/sound.js): bass = pulse + blue glow, mids = swirl, highs = silver flashes
      var snd = window.SoundViz ? window.SoundViz.levels() : null;
      var bass = snd ? snd.bass : 0, mid = snd ? snd.mid : 0, high = snd ? snd.high : 0;
      if (mid > 0.02) swirl += mid * 0.018; else swirl *= 0.985;   // flakes drift back when the music stops
      var spark = Math.min(1, Math.max(energy, high * 1.3));

      // grain scrolls slowly with the page (parallax), tiled vertically
      var off = ((sy * 0.25) % H + H) % H;
      p.image(base, 0, -off);
      p.image(base, 0, H - off);

      // light direction sweeps with scroll position and time -> flakes flash
      var t = p.millis() / 1000;
      var light = t * 0.22 + sy * 0.0045 + high * 0.35 * Math.sin(t * 9);
      var sharp = Math.max(4, 26 - spark * 16 - bass * 8);   // wider highlight while scrolling / on bass = more sparkle
      var gain = 0.55 + spark * 0.45;
      var glintAt = 0.7 - spark * 0.22 - high * 0.15;       // more star glints while scrolling / on highs
      var foff = ((sy * 0.4) % H + H) % H;
      var cx = W / 2, cy = H / 2, dmax = Math.sqrt(cx * cx + cy * cy), swirling = Math.abs(swirl) > 0.0005;

      for (var i = 0; i < flakes.length; i++) {
        var f = flakes[i];
        var g = Math.cos(f.a - light + Math.sin(t * 0.7 + f.x * 0.01) * 0.25);
        if (g <= 0) continue;
        g = Math.pow(g, sharp) * (gain + (f.silver ? high * 0.7 : bass * 1.2));
        if (g < 0.04) continue;
        var x = f.x, y = f.y - foff; if (y < 0) y += H;
        if (swirling) {                                     // vortex around the middle, stronger near the centre
          var ox = x - cx, oy = y - cy, ang = swirl * (1.25 - Math.sqrt(ox * ox + oy * oy) / dmax);
          var ca = Math.cos(ang), sa = Math.sin(ang);
          x = cx + ox * ca - oy * sa; y = cy + ox * sa + oy * ca;
        }
        var s = f.s * (1 + bass * 1.1);
        var a = Math.min(255, g * 255);
        p.fill(f.c[0], f.c[1], f.c[2], a);
        p.push();
        p.translate(x, y);
        p.rotate(f.rot + swirl);
        p.rect(-s / 2, -s / 2, s, s);
        p.pop();
        // brightest silver flakes get a small star glint
        if (f.silver && g > glintAt) {
          var L = s * (3 + g * 4);
          p.stroke(240, 244, 250, a * 0.75);
          p.strokeWeight(0.8);
          p.line(x - L, y, x + L, y);
          p.line(x, y - L, x, y + L);
          p.noStroke();
          p.fill(255, 255, 255, a * 0.18);
          p.circle(x, y, L * 0.9);
        }
      }
    };

    document.addEventListener('visibilitychange', function () {
      if (reduce) return;
      if (document.visibilityState === 'visible') p.loop(); else p.noLoop();
    });
  });
})();
