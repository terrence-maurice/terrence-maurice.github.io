/* Třpytivé pozadí (p5.js): černé zrno + stříbrné a tmavě modré flitry, které se lesknou při scrollování
   a reagují na hrající nahrávku ze Zvuků Izmiru (assets/sound.js): čím hlasitěji, tím víc hvězdiček vyskočí.
   Glitter background (p5.js): black grain + silver and dark-blue flakes that catch the light as you scroll
   and react to the playing Sounds of Izmir recording (assets/sound.js): the louder it is, the more stars pop up. */
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
    var base, flakes = [], pops = [], popDebt = 0, W, H, lastY = 0, energy = 0, resizeTimer = null;

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

      // sound (Zvuky Izmiru, assets/sound.js): bass = pulse + blue glow, highs = silver flashes,
      // loudness = glitter stars popping up at random spots (more stars the louder it is)
      var snd = window.SoundViz ? window.SoundViz.levels() : null;
      var bass = snd ? snd.bass : 0, high = snd ? snd.high : 0, loud = snd ? snd.level : 0;
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

      for (var i = 0; i < flakes.length; i++) {
        var f = flakes[i];
        var g = Math.cos(f.a - light + Math.sin(t * 0.7 + f.x * 0.01) * 0.25);
        if (g <= 0) continue;
        g = Math.pow(g, sharp) * (gain + (f.silver ? high * 0.7 : bass * 1.2));
        if (g < 0.04) continue;
        var x = f.x, y = f.y - foff; if (y < 0) y += H;
        var s = f.s * (1 + bass * 1.1);
        var a = Math.min(255, g * 255);
        p.fill(f.c[0], f.c[1], f.c[2], a);
        p.push();
        p.translate(x, y);
        p.rotate(f.rot);
        p.rect(-s / 2, -s / 2, s, s);
        p.pop();
        // brightest silver flakes get a twinkling glitter sparkle
        if (f.silver && g > glintAt) {
          var tw = 0.72 + 0.28 * Math.sin(t * 5.5 + f.a * 9);      // each star twinkles at its own rhythm
          sparkle(x, y, s * (3 + g * 4) * tw, a, f.rot * 0.25);
        }
      }

      // while a recording plays, glitter stars pop up at random spots; the louder the moment, the more of them
      if (loud > 0.01) {
        popDebt += Math.pow(loud, 1.6) * 7;                  // expected new stars this frame
        while (popDebt >= 1 && pops.length < 140) {
          popDebt -= 1;
          pops.push({
            x: Math.random() * W, y: Math.random() * H, born: t,
            life: 0.35 + Math.random() * 0.75, size: 7 + Math.random() * 16 * (0.5 + loud),
            rot: Math.random() * Math.PI
          });
        }
        if (popDebt > 3) popDebt = 3;
      }
      for (var j = pops.length - 1; j >= 0; j--) {
        var q = pops[j], age = (t - q.born) / q.life;
        if (age >= 1) { pops.splice(j, 1); continue; }
        var env = Math.sin(Math.PI * age);                     // flash in, fade out
        sparkle(q.x, q.y, q.size * (0.35 + 0.65 * env), 255 * env, q.rot);
      }
    };

    // a glitter star: tight layered glow, four tapered needle rays and four shorter, bluish diagonal rays
    function sparkle(x, y, L, a, rot) {
      p.push();
      p.translate(x, y);
      p.rotate(rot);
      p.fill(200, 215, 255, a * 0.06); p.circle(0, 0, L * 0.9);
      p.fill(235, 242, 255, a * 0.14); p.circle(0, 0, L * 0.45);
      p.fill(255, 255, 255, a * 0.5);  p.circle(0, 0, L * 0.16);
      var w = Math.max(0.45, L * 0.045);
      p.fill(248, 250, 255, a * 0.9);
      for (var k = 0; k < 4; k++) { p.triangle(0, -w, L, 0, 0, w); p.rotate(Math.PI / 2); }
      p.rotate(Math.PI / 4);
      var d = L * 0.42;
      p.fill(190, 208, 255, a * 0.55);
      for (var m = 0; m < 4; m++) { p.triangle(0, -w * 0.7, d, 0, 0, w * 0.7); p.rotate(Math.PI / 2); }
      p.pop();
    }

    document.addEventListener('visibilitychange', function () {
      if (reduce) return;
      if (document.visibilityState === 'visible') p.loop(); else p.noLoop();
    });
  });
})();
