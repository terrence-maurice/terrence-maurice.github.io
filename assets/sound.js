/* Zvuk pro seznamy nahrávek s `visual: true` (Zvuky Izmiru):
   - u každé nahrávky její tvar (waveform z assets/waveforms.js), přehraná část se rozsvítí, klik = skok;
   - živá analýza hrající nahrávky (Web Audio) – z ní čte třpytivé pozadí (glitter.js), aby reagovalo na zvuk:
     basy = flitry pulzují a modré svítí, středy = víří, výšky = stříbrné záblesky.
   Sound for audio lists with `visual: true` (Sounds of Izmir):
   - each recording's waveform (from assets/waveforms.js): the played part lights up, click to jump;
   - live analysis of the playing recording (Web Audio), read by the glitter background (glitter.js) so it reacts:
     bass = flakes pulse and the blue ones glow, mids = they swirl, highs = silver flashes. */
(function () {
  'use strict';

  var actx = null, analyser = null, freq = null;   // one shared Web Audio graph
  var current = null;                              // the <audio> that is playing
  var waves = [];
  var lv = { level: 0, bass: 0, mid: 0, high: 0 }; // smoothed 0–1 levels for glitter.js

  /* ---------- Web Audio ---------- */
  function connect(audio) {
    try {
      if (!actx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        actx = new AC();
        analyser = actx.createAnalyser();
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.75;
        analyser.connect(actx.destination);
        freq = new Uint8Array(analyser.frequencyBinCount);
      }
      if (!audio._src) { audio._src = actx.createMediaElementSource(audio); audio._src.connect(analyser); }
      if (actx.state === 'suspended') actx.resume();
    } catch (e) { /* without Web Audio the music still plays, the glitter just doesn't react */ }
  }

  function band(from, to) {          // average of the frequency bins in [from, to) Hz, 0–1
    var hz = actx.sampleRate / 2 / freq.length, a = Math.max(0, Math.floor(from / hz)), b = Math.min(freq.length, Math.ceil(to / hz)), s = 0;
    for (var i = a; i < b; i++) s += freq[i];
    return b > a ? s / (b - a) / 255 : 0;
  }

  // called by glitter.js once per frame
  function levels() {
    var playing = current && !current.paused && analyser;
    var t = { level: 0, bass: 0, mid: 0, high: 0 };
    if (playing) {
      analyser.getByteFrequencyData(freq);
      t.bass = band(30, 220); t.mid = band(220, 2500); t.high = band(2500, 11000);
      t.level = (t.bass + t.mid + t.high) / 3;
    }
    for (var k in lv) lv[k] += (t[k] - lv[k]) * (t[k] > lv[k] ? 0.5 : 0.08);   // fast attack, slow release
    return lv;
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

  /* ---------- wiring ---------- */
  function init(scope) {
    destroy();
    scope.querySelectorAll('[data-sound-visual]').forEach(function (list) {
      list.querySelectorAll('.track').forEach(function (li) {
        var audio = li.querySelector('audio'), wbox = li.querySelector('[data-wave]');
        var data = wbox && window.WAVEFORMS && window.WAVEFORMS[wbox.getAttribute('data-wave')];
        if (data) {
          var w = { canvas: wbox.querySelector('canvas'), audio: audio, data: data };
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
        });
        function stop() { li.classList.remove('is-playing'); }
        audio.addEventListener('pause', stop);
        audio.addEventListener('ended', stop);
      });
    });
  }

  function destroy() { waves = []; current = null; }

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt); rt = setTimeout(function () { waves.forEach(drawWave); }, 150);
  });

  window.SoundViz = { init: init, destroy: destroy, levels: levels };
})();
