/* Vizualizace zvuku pro seznamy nahrávek s `visual: true` (Zvuky Izmiru):
   - „moře zvuku“: 3D pole částic (three.js, MIT), které se vlní podle živého spektra hrající nahrávky,
     vlny se šíří od středu ven; bez zvuku jen tiše dýchá;
   - u každé nahrávky její tvar (waveform z assets/waveforms.js), přehraná část se rozsvítí, klik = skok.
   Sound visualisation for audio lists with `visual: true` (Sounds of Izmir):
   - a "sea of sound": a 3D particle field (three.js, MIT) rippling with the live spectrum of the playing
     recording, waves travelling outward from the centre; it breathes quietly when nothing plays;
   - each recording's waveform (from assets/waveforms.js): the played part lights up, click to jump. */
(function () {
  'use strict';

  var THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var actx = null, analyser = null, freq = null;   // one shared Web Audio graph
  var current = null;                              // the <audio> that is playing
  var seas = [];                                   // live particle seas on the page
  var waves = [];                                  // waveform canvases on the page
  var threeLoading = null;

  /* ---------- Web Audio ---------- */
  function connect(audio) {
    try {
      if (!actx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        actx = new AC();
        analyser = actx.createAnalyser();
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.78;
        analyser.connect(actx.destination);
        freq = new Uint8Array(analyser.frequencyBinCount);
      }
      if (!audio._src) { audio._src = actx.createMediaElementSource(audio); audio._src.connect(analyser); }
      if (actx.state === 'suspended') actx.resume();
    } catch (e) { /* without Web Audio the sea just keeps breathing */ }
  }

  /* ---------- waveforms ---------- */
  function drawWave(w) {
    var c = w.canvas, box = c.parentNode, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var cw = box.clientWidth, ch = box.clientHeight;
    if (!cw || !ch) return;
    if (c.width !== Math.round(cw * dpr)) { c.width = Math.round(cw * dpr); c.height = Math.round(ch * dpr); }
    var g = c.getContext('2d'), data = w.data, step = 4 * dpr, bar = 2 * dpr;
    var n = Math.max(1, Math.floor(c.width / step));
    var a = w.audio, prog = a.duration ? a.currentTime / a.duration : 0;
    g.clearRect(0, 0, c.width, c.height);
    for (var i = 0; i < n; i++) {
      var s = Math.floor(i * data.length / n), e = Math.max(s + 1, Math.floor((i + 1) * data.length / n)), m = 0;
      for (var k = s; k < e; k++) if (data[k] > m) m = data[k];
      var h = Math.max(dpr, (m / 100) * c.height * 0.92);
      g.fillStyle = (i + 0.5) / n <= prog ? 'rgba(240,240,240,0.95)' : 'rgba(195,205,224,0.32)';
      g.fillRect(i * step, (c.height - h) / 2, bar, h);
    }
    if (prog > 0) { g.fillStyle = '#ffffff'; g.fillRect(Math.round(prog * c.width) - dpr, 0, dpr * 1.5, c.height); }
  }

  function seek(w, ev) {
    var r = w.canvas.getBoundingClientRect(), f = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width)), a = w.audio;
    function go() { a.currentTime = f * a.duration; drawWave(w); }
    if (a.duration) go(); else { a.preload = 'metadata'; a.addEventListener('loadedmetadata', go, { once: true }); a.load(); }
    a.play();
  }

  /* ---------- the particle sea (three.js) ---------- */
  function loadThree() {
    if (window.THREE) return Promise.resolve();
    if (!threeLoading) threeLoading = new Promise(function (ok, fail) {
      var s = document.createElement('script');
      s.src = THREE_URL; s.async = true; s.onload = ok; s.onerror = fail;
      document.head.appendChild(s);
    });
    return threeLoading;
  }

  function dotTexture(T) {
    var c = document.createElement('canvas'); c.width = c.height = 64;
    var g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,255,255,0.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return new T.CanvasTexture(c);
  }

  function makeSea(box) {
    var T = window.THREE, canvas = box.querySelector('canvas');
    var small = window.innerWidth < 760;
    var RINGS = small ? 38 : 56, SEG = small ? 96 : 144, N = RINGS * SEG;

    var renderer = new T.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));
    var scene = new T.Scene();
    var camera = new T.PerspectiveCamera(50, 1, 0.1, 50);
    camera.position.set(0, 1.05, 2.15);
    camera.lookAt(0, -0.18, -0.35);

    var pos = new Float32Array(N * 3), col = new Float32Array(N * 3), base = new Float32Array(N * 2);
    for (var r = 0, p = 0; r < RINGS; r++) {
      var rad = 0.08 + (r / (RINGS - 1)) * 1.85;
      for (var s = 0; s < SEG; s++, p++) {
        var th = (s / SEG) * Math.PI * 2 + (r % 2) * (Math.PI / SEG);
        pos[p * 3] = Math.cos(th) * rad; pos[p * 3 + 2] = Math.sin(th) * rad;
        base[p * 2] = rad; base[p * 2 + 1] = th;
      }
    }
    var geo = new T.BufferGeometry();
    geo.setAttribute('position', new T.BufferAttribute(pos, 3));
    geo.setAttribute('color', new T.BufferAttribute(col, 3));
    var mat = new T.PointsMaterial({
      size: small ? 0.05 : 0.042, map: dotTexture(T), vertexColors: true, transparent: true,
      depthWrite: false, blending: T.AdditiveBlending, sizeAttenuation: true
    });
    var points = new T.Points(geo, mat);
    scene.add(points);

    var energy = new Float32Array(RINGS);          // loudness travelling outward, ring by ring
    var spec = new Float32Array(SEG / 2);          // smoothed spectrum around half the circle (mirrored)
    var silver = [0.83, 0.85, 0.89], blue = [0.24, 0.36, 0.66], white = [1, 1, 1];
    var t0 = performance.now(), raf = 0, visible = true, alive = true;

    function resize() {
      var w = box.clientWidth, h = box.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }

    function frame() {
      raf = 0;
      if (!alive) return;
      var t = (performance.now() - t0) / 1000, level = 0;
      var playing = current && !current.paused && analyser;
      if (playing) {
        analyser.getByteFrequencyData(freq);
        var bins = Math.floor(freq.length * 0.7), half = spec.length;
        for (var i = 0; i < half; i++) {
          var b0 = Math.floor(Math.pow(i / half, 1.7) * bins), b1 = Math.max(b0 + 1, Math.floor(Math.pow((i + 1) / half, 1.7) * bins)), m = 0;
          for (var b = b0; b < b1; b++) m += freq[b];
          var v = m / (b1 - b0) / 255;
          spec[i] += (v - spec[i]) * 0.35;
          level += v;
        }
        level /= half;
      } else {
        for (var j = 0; j < spec.length; j++) spec[j] *= 0.94;
      }
      for (var q = RINGS - 1; q > 0; q--) energy[q] = energy[q - 1] * 0.985;   // waves move outward
      energy[0] += ((playing ? Math.min(1, level * 2.4) : 0) - energy[0]) * 0.5;

      for (var r2 = 0, p2 = 0; r2 < RINGS; r2++) {
        var e = energy[r2], fall = 1 - r2 / (RINGS * 1.15);
        for (var s2 = 0; s2 < SEG; s2++, p2++) {
          var rad2 = base[p2 * 2], th2 = base[p2 * 2 + 1];
          var k = s2 < SEG / 2 ? s2 : SEG - 1 - s2;                       // mirror the spectrum around the circle
          var idle = 0.045 * Math.sin(rad2 * 4.2 - t * 0.9) * Math.sin(th2 * 3 + t * 0.25) + 0.03 * Math.sin(rad2 * 2.3 + t * 0.6);
          var y = idle + e * (0.18 + 0.82 * spec[k]) * 0.95 * fall;
          pos[p2 * 3 + 1] = y;
          var hgt = Math.max(0, Math.min(1, y * 2.2 + 0.25));
          var glow = Math.min(1, e * spec[k] * 2.2);
          for (var c3 = 0; c3 < 3; c3++) {
            var cc = blue[c3] + (silver[c3] - blue[c3]) * hgt;
            col[p2 * 3 + c3] = (cc + (white[c3] - cc) * glow) * (0.35 + 0.65 * (1 - rad2 / 2.1));
          }
        }
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;
      points.rotation.y = t * 0.035;
      renderer.render(scene, camera);
      if (!reduceMotion && visible && !document.hidden) raf = requestAnimationFrame(frame);
    }

    function wake() { if (!raf && alive) raf = requestAnimationFrame(frame); }
    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (en) {
      visible = en[0].isIntersecting; if (visible) wake();
    }) : null;
    if (io) io.observe(box);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', wake);
    resize();
    frame();

    return {
      wake: wake,
      destroy: function () {
        alive = false; if (raf) cancelAnimationFrame(raf);
        if (io) io.disconnect();
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', wake);
        geo.dispose(); mat.map.dispose(); mat.dispose(); renderer.dispose();
      }
    };
  }

  /* ---------- wiring ---------- */
  function init(scope) {
    destroy();
    scope.querySelectorAll('[data-sound-visual]').forEach(function (list) {
      var box = list.parentNode.querySelector('[data-sound-sea]');
      var now = box && box.querySelector('[data-sound-now]');
      var idleHTML = now ? now.innerHTML : '';

      list.querySelectorAll('.track').forEach(function (li) {
        var audio = li.querySelector('audio'), wbox = li.querySelector('[data-wave]');
        var data = wbox && window.WAVEFORMS && window.WAVEFORMS[wbox.getAttribute('data-wave')];
        var w = null;
        if (data) {
          w = { canvas: wbox.querySelector('canvas'), audio: audio, data: data };
          waves.push(w);
          wbox.addEventListener('click', function (ev) { seek(w, ev); });
          audio.addEventListener('timeupdate', function () { drawWave(w); });
          audio.addEventListener('loadedmetadata', function () { drawWave(w); });
          drawWave(w);
        }
        audio.addEventListener('play', function () {
          list.querySelectorAll('audio').forEach(function (o) { if (o !== audio) o.pause(); });   // one recording at a time
          current = audio;
          connect(audio);
          li.classList.add('is-playing');
          if (now) now.innerHTML = '<span aria-hidden="true">▶</span> ' + li.querySelector('.track-name').innerHTML;
          seas.forEach(function (s) { s.wake(); });
        });
        function stop() {
          li.classList.remove('is-playing');
          if (current === audio && now) now.innerHTML = idleHTML;
        }
        audio.addEventListener('pause', stop);
        audio.addEventListener('ended', stop);
      });

      if (box) loadThree().then(function () {
        if (document.body.contains(box)) seas.push(makeSea(box));
      }).catch(function () { box.classList.add('no-webgl'); });
    });
  }

  function destroy() {
    seas.forEach(function (s) { s.destroy(); });
    seas = []; waves = []; current = null;
  }

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt); rt = setTimeout(function () { waves.forEach(drawWave); }, 150);
  });

  window.SoundViz = { init: init, destroy: destroy };
})();
