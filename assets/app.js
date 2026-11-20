(function () {
  'use strict';

  var root = document.documentElement;
  var app = document.getElementById('app');

  /* ---------- helpers ---------- */
  function L(o, tag) {
    if (o == null) return '';
    if (typeof o === 'string') return o;
    tag = tag || 'span';
    return '<' + tag + ' class="l-cs" lang="cs">' + o.cs + '</' + tag + '>' +
           '<' + tag + ' class="l-en" lang="en">' + o.en + '</' + tag + '>';
  }
  function paras(o) {
    if (!o) return '';
    return '<div class="l-cs" lang="cs">' + o.cs.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div>' +
           '<div class="l-en" lang="en">' + o.en.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div>';
  }
  function lang() { return root.getAttribute('data-lang') === 'en' ? 'en' : 'cs'; }
  function tr(cs, en) { return lang() === 'en' ? en : cs; }
  function plain(o) { return typeof o === 'string' ? o : (o ? o[lang()] : ''); }
  function stripTags(s) { return String(s).replace(/<[^>]+>/g, ''); }

  /* ---------- language ---------- */
  function setLang(l) {
    root.setAttribute('data-lang', l);
    root.lang = l;
    try { localStorage.setItem('lang', l); } catch (e) {}
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === l));
    });
    updateDynamicLabels();
  }
  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-set-lang')); });
  });

  /* ---------- menu ---------- */
  var menu = document.getElementById('menu');
  var menuBtn = document.getElementById('menu-btn');
  var overlay = document.getElementById('menu-overlay');
  function openMenu() {
    menu.classList.add('open'); menu.removeAttribute('inert');
    overlay.hidden = false; requestAnimationFrame(function () { overlay.classList.add('show'); });
    menuBtn.setAttribute('aria-expanded', 'true');
    var first = menu.querySelector('a'); if (first) first.focus({ preventScroll: true });
  }
  function closeMenu(returnFocus) {
    if (!menu.classList.contains('open')) return;
    menu.classList.remove('open'); menu.setAttribute('inert', '');
    overlay.classList.remove('show'); setTimeout(function () { overlay.hidden = true; }, 350);
    menuBtn.setAttribute('aria-expanded', 'false');
    if (returnFocus) menuBtn.focus({ preventScroll: true });
  }
  menuBtn.addEventListener('click', function () { menu.classList.contains('open') ? closeMenu(true) : openMenu(); });
  document.getElementById('menu-close').addEventListener('click', function () { closeMenu(true); });
  overlay.addEventListener('click', function () { closeMenu(true); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(true); });

  /* ---------- pages ---------- */
  function renderHome() {
    var a = ABOUT;
    var study = a.study.map(function (s) {
      return '<li><h3>' + L(s.title) + ' <span class="when">' + L(s.when) + '</span></h3><p>' + L(s.text) + '</p></li>';
    }).join('');
    var practice = a.practice.map(function (p) {
      return '<li><h3>' + L(p.title) + '</h3><p>' + L(p.text) + '</p></li>';
    }).join('');
    var skills = a.skills.map(function (s) {
      return '<li><strong>' + s.name + '</strong>' + (s.note ? ' <span class="muted">(' + L(s.note) + ')</span>' : '') + '</li>';
    }).join('');
    var langs = a.languages.map(function (l) { return '<li>' + L(l) + '</li>'; }).join('');

    return '' +
      '<section class="hero">' +
        '<blockquote class="hero-quote" lang="cs"><p>Jednou jsi součástí audiovize – navždy jsi součástí audiovize. Máš prostě zvukové vize...vize se zvukem! Kapiš?</p></blockquote>' +
        '<h1 class="display-xl hero-name"><span>Tereza</span> <span>Muric</span></h1>' +
        '<p class="lead"' + (typeof a.lead === 'string' ? ' lang="cs"' : '') + '>' + L(a.lead) + '</p>' +
      '</section>' +
      '<nav class="chapter-index" aria-label="' + tr('Kapitoly', 'Chapters') + '">' +
        chapterLink('#/famu-cas', { cs: 'FAMU CAS', en: 'FAMU CAS' }, { cs: '2023 — 2025', en: '2023 — 2025' }) +
        chapterLink('#/volna-tvorba', { cs: 'Volná tvorba', en: 'Independent work' }, { cs: '2022', en: '2022' }) +
        chapterLink('#/galerie', GALERIE_TITLE, { cs: '2022 — 2025', en: '2022 — 2025' }) +
        chapterLink('#/kontakt', { cs: 'Kontakt', en: 'Contact' }, { cs: 'e-mail, telefon', en: 'e-mail, phone' }) +
      '</nav>' +
      '<section class="cv" aria-label="CV">' +
        '<div class="cv-col"><h2 class="cv-head">' + L({ cs: 'Studium', en: 'Education' }) + '</h2><ul class="cv-list">' + study + '</ul>' +
          '<h2 class="cv-head">' + L({ cs: 'Dovednosti', en: 'Skills' }) + '</h2><ul class="cv-skills">' + skills + '</ul>' +
          '<ul class="cv-skills cv-langs">' + langs + '</ul></div>' +
        '<div class="cv-col"><h2 class="cv-head">' + L({ cs: 'Praxe', en: 'Experience' }) + '</h2><ul class="cv-list">' + practice + '</ul></div>' +
      '</section>';
  }

  function chapterLink(href, title, sub) {
    return '<a class="chapter-link" href="' + href + '"><span class="chapter-name">' + L(title) + '</span>' +
      '<span class="chapter-sub">' + L(sub) + '</span><span class="chapter-arrow" aria-hidden="true">→</span></a>';
  }

  function backLink() {
    return '<a class="back-link" href="#/"><span class="arrow" aria-hidden="true">←</span>' +
      L({ cs: 'Hlavní menu', en: 'Main menu' }) + '</a>';
  }

  /* Galerie pohyblivého obrazu: všechna videa z ostatních kapitol (stejné soubory), seskupená podle roku sekce.
     Moving-image gallery: every video from the other chapters (same files), grouped by the year of the section it sits in. */
  var GALERIE_TITLE = { cs: 'Galerie pohyblivého obrazu', en: 'Galerie pohyblivého obrazu' };

  function galleryChapter() {
    var byYear = {};
    Object.keys(CHAPTERS).forEach(function (key) {
      CHAPTERS[key].sections.forEach(function (s) {
        s.works.forEach(function (w) {
          if (!w.video && !w.videos) return;
          (byYear[s.year] = byYear[s.year] || []).push({ title: w.title, video: w.video, videos: w.videos });
        });
      });
    });
    return {
      title: GALERIE_TITLE, titleClass: 'display-gallery',
      sections: Object.keys(byYear).sort().map(function (y) { return { year: y, season: null, works: byYear[y] }; })
    };
  }

  function renderChapter(key) {
    var ch = key === 'galerie' ? galleryChapter() : CHAPTERS[key];
    var idx = ch.sections.map(function (s, i) {
      return '<button type="button" class="year-jump" data-jump="sec-' + i + '">' + s.year +
        (s.season ? ' <span class="muted">' + L(shortSeason(s.season)) + '</span>' : '') + '</button>';
    }).join('');
    var body = ch.sections.map(function (s, i) { return renderSection(s, key, i); }).join('');
    return '' +
      '<div class="page-head">' + backLink() +
        '<h1 class="display-xl' + (ch.titleClass ? ' ' + ch.titleClass : '') + '">' + L(ch.title) + '</h1>' +
        (ch.sections.length > 1 ? '<nav class="year-index" aria-label="' + tr('Roky', 'Years') + '">' + idx + '</nav>' : '') +
      '</div>' + body +
      '<div class="page-end">' + backLink() + '</div>';
  }

  function shortSeason(s) {
    var cs = s.cs.replace(' klauzura', '').replace(' — Cinema and Digital Media', '');
    var en = s.en.replace(' klauzura', '').replace(' — Cinema and Digital Media', '');
    return { cs: cs, en: en };
  }

  function renderSection(s, key, i) {
    return '<section class="period" id="sec-' + i + '">' +
      '<header class="period-head"><h2 class="year">' + s.year + '</h2>' +
        (s.season ? '<span class="season">' + L(s.season) + '</span>' : '') + '</header>' +
      (s.note ? '<p class="period-note">' + L(s.note) + '</p>' : '') +
      s.works.map(renderWork).join('') +
    '</section>';
  }

  function renderWork(w) {
    var h = '<article class="work">';
    h += '<h3 class="work-title">' + L(w.title) + '</h3>';
    if (w.meta) h += '<p class="work-meta">' + L(w.meta) + '</p>';
    if (w.video) h += videoEl(w.video, plain(w.title));
    if (w.videos) h += videoGallery(w.videos, w.title);
    if (w.text || w.textTitle) {
      h += '<div class="work-text">';
      if (w.textTitle) h += '<p class="text-title">' + L(w.textTitle) + '</p>';
      h += paras(w.text);
      if (w.more) {
        h += '<details class="more"><summary>' + L(w.moreLabel || { cs: 'Číst dál', en: 'Read more' }) + '</summary>' + paras(w.more) + '</details>';
      }
      h += '</div>';
    }
    if (w.audio) h += audioList(w.audio);
    if (w.galleries) h += w.galleries.map(function (g) { return gallery(g, w.title); }).join('');
    h += '</article>';
    return h;
  }

  function videoEl(v, label) {
    return '<div class="video-wrap"><video controls playsinline preload="none" poster="' + v.poster + '" aria-label="' + stripTags(label) + '">' +
      '<source src="' + v.src + '" type="video/mp4"></video></div>';
  }

  function gallery(g, workTitle) {
    var label = stripTags(plain(g.title || workTitle));
    var slides = g.images.map(function (im, i) {
      var name = typeof im === 'string' ? im : im.name;
      var src = g.base + name + '.webp';
      var alt = label + ' — ' + (i + 1) + '/' + g.images.length;
      var img = '<img ' + (i === 0 ? 'src' : 'data-src') + '="' + src + '" alt="' + alt + '" decoding="async"' + (i === 0 ? ' loading="lazy"' : '') + '>';
      if (typeof im === 'object' && im.print) {
        // tisk: obrázek vyjede shora jako papír z tiskárny a dá se přiblížit / print: slides out from the top like paper, zoomable
        return '<div class="slide slide-print" data-print>' +
          '<div class="print-wrap"><span class="print-slot" aria-hidden="true"></span>' +
            '<div class="print-sheet">' + img + '</div>' +
            '<button type="button" class="zoom-btn" data-zoom="' + src + '" data-alt="' + alt + '" tabindex="-1">' +
              '<span aria-hidden="true">⤢</span> ' + L({ cs: 'Přiblížit', en: 'Zoom in' }) + '</button>' +
          '</div></div>';
      }
      return '<div class="slide">' + img + '</div>';
    }).join('');
    return '<figure class="gallery" data-gallery data-count="' + g.images.length + '">' +
      '<figcaption class="gallery-head">' +
        '<span class="gallery-title">' + (g.title ? L(g.title) : '') + '</span>' +
        '<span class="gallery-count"><span data-idx>1</span> / ' + g.images.length + '</span>' +
      '</figcaption>' +
      '<div class="gallery-stage" tabindex="0" role="button" data-label-cs="Další obrázek" data-label-en="Next image">' +
        '<div class="gallery-track">' + slides + '</div>' +
      '</div>' +
      '<p class="gallery-hint">' + L({ cs: 'Klikněte na obrázek pro další →', en: 'Click the image for the next one →' }) + '</p>' +
    '</figure>';
  }

  function videoGallery(list, title) {
    var label = stripTags(plain(title));
    var slides = list.map(function (v, i) {
      return '<div class="slide"><video controls playsinline preload="none" poster="' + v.poster + '" aria-label="' + label + ' ' + (i + 1) + '/' + list.length + '"><source src="' + v.src + '" type="video/mp4"></video></div>';
    }).join('');
    return '<figure class="gallery video-gallery" data-gallery data-video data-count="' + list.length + '">' +
      '<div class="gallery-stage"><div class="gallery-track">' + slides + '</div></div>' +
      '<figcaption class="gallery-head">' +
        '<button type="button" class="vg-btn" data-prev><span aria-hidden="true">←</span><span class="sr-only">' + L({ cs: 'Předchozí', en: 'Previous' }) + '</span></button>' +
        '<span class="gallery-count">' + L({ cs: 'Záznam', en: 'Clip' }) + ' <span data-idx>1</span> / ' + list.length + '</span>' +
        '<button type="button" class="vg-btn" data-next><span aria-hidden="true">→</span><span class="sr-only">' + L({ cs: 'Další', en: 'Next' }) + '</span></button>' +
      '</figcaption>' +
    '</figure>';
  }

  function audioList(a) {
    return '<ol class="tracks">' + a.tracks.map(function (t, i) {
      return '<li class="track"><span class="track-no">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="track-name">' + t[1] + '</span>' +
        '<audio controls preload="none" src="' + a.base + t[0] + '.m4a" aria-label="' + t[1] + '"></audio></li>';
    }).join('') + '</ol>';
  }

  function renderContact() {
    return '' +
      '<div class="page-head">' + backLink() +
        '<h1 class="display-xl">' + L({ cs: 'Kontakt', en: 'Contact' }) + '</h1></div>' +
      '<section class="contact">' +
        '<p class="contact-label">E-mail</p><a class="contact-big" href="mailto:' + CONTACT.email + '">' + CONTACT.email + '</a>' +
        '<p class="contact-label">' + L({ cs: 'Telefon', en: 'Phone' }) + '</p><a class="contact-big" href="tel:' + CONTACT.phoneHref + '">' + CONTACT.phone + '</a>' +
        '<p class="contact-label">' + L({ cs: 'Místo', en: 'Location' }) + '</p><p class="contact-big">' + L(CONTACT.city) + '</p>' +
      '</section>';
  }

  /* ---------- gallery sizing ----------
     Každý obrázek má svůj vlastní formát (nic se neořezává ani nedeformuje). Obrázky jedné galerie mají
     zhruba stejnou plochu: průměr ploch, které by měly, kdyby každý sám vyplnil scénu.
     Every image keeps its own aspect ratio (never cropped or stretched). Images in one gallery get roughly
     the same area: the average of the areas they would have if each filled the stage on its own. */
  var PRINT_PAD = 12;          // room above and below the print sheet for the printer slot
  var viewH = window.innerHeight, viewW = window.innerWidth;

  function aspectOf(img) { return img && img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 0; }

  function layoutGallery(g) {
    var stage = g.querySelector('.gallery-stage');
    var W = stage.clientWidth;
    if (!W) return;
    var Hmax = Math.round(viewH * 0.82);
    var items = [];
    g.querySelectorAll('.slide').forEach(function (s) {
      var img = s.querySelector('img');
      items.push({ s: s, img: img, a: aspectOf(img), print: s.hasAttribute('data-print') });
    });
    var normal = items.filter(function (it) { return it.a && !it.print; });
    var A = 0;
    normal.forEach(function (it) { var h = Math.min(Hmax, W / it.a); A += h * h * it.a; });
    if (normal.length) A /= normal.length;

    var baseH = 0;
    items.forEach(function (it) {
      var a = it.a || 1.5, h;
      if (it.print) h = Math.min(Hmax - 2 * PRINT_PAD, W / a);               // the whole sheet, as tall as fits
      else h = Math.min(A ? Math.sqrt(A / a) : Hmax, Hmax, W / a);
      var w = Math.round(h * a);
      h = Math.round(h);
      var box = it.print ? it.s.querySelector('.print-sheet') : it.img;
      box.style.width = w + 'px';
      box.style.height = h + 'px';
      it.s._h = it.print ? h + 2 * PRINT_PAD : h;
      if (!it.print) baseH = Math.max(baseH, h);
    });
    g._baseH = baseH || Math.min(Hmax, Math.round(W / 1.5));
    sizeStage(g, g._index ? g._index() : 0);
  }

  // the stage keeps the height of the gallery's tallest ordinary image; it grows only for the print sheet
  function sizeStage(g, i) {
    var s = g.querySelectorAll('.slide')[i];
    var h = s && s.hasAttribute('data-print') ? Math.max(g._baseH, s._h) : g._baseH;
    if (h) g.querySelector('.gallery-stage').style.height = h + 'px';
  }

  var reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  // the print slide "comes out of the printer" every time it becomes the current slide
  function onSlide(g, s) {
    g.querySelectorAll('[data-zoom]').forEach(function (b) { b.tabIndex = -1; });
    if (!s || !s.hasAttribute('data-print')) return;
    var b = s.querySelector('[data-zoom]');
    if (b) b.tabIndex = 0;
    if (!g.classList.contains('touched') || (reduceMotion && reduceMotion.matches)) return;
    s.classList.remove('printing');
    void s.offsetWidth;
    s.classList.add('printing');
  }

  window.addEventListener('resize', function () {
    clearTimeout(window._galleryResize);
    window._galleryResize = setTimeout(function () {
      // mobile browsers fire resize while the address bar hides; only re-measure on a real size change
      if (window.innerWidth === viewW && Math.abs(window.innerHeight - viewH) < 160) return;
      viewW = window.innerWidth; viewH = window.innerHeight;
      app.querySelectorAll('[data-gallery]:not([data-video])').forEach(layoutGallery);
      if (zoomer && !zoomer.hidden) setZoom(zoomLevel);
    }, 120);
  });

  /* ---------- zoom view (print sheet) ---------- */
  var zoomer = null, zoomLevel = 1, zoomOpener = null;
  var ZOOM_LEVELS = [1, 2, 4, 6];

  function buildZoomer() {
    zoomer = document.createElement('div');
    zoomer.className = 'zoomer';
    zoomer.hidden = true;
    zoomer.setAttribute('role', 'dialog');
    zoomer.setAttribute('aria-modal', 'true');
    zoomer.innerHTML = '<div class="zoomer-scroll"><img alt="" draggable="false"></div>' +
      '<div class="zoomer-bar">' +
        '<button type="button" data-z="out"><span aria-hidden="true">−</span><span class="sr-only">' + L({ cs: 'Oddálit', en: 'Zoom out' }) + '</span></button>' +
        '<span class="zoomer-level" aria-live="polite"></span>' +
        '<button type="button" data-z="in"><span aria-hidden="true">+</span><span class="sr-only">' + L({ cs: 'Přiblížit', en: 'Zoom in' }) + '</span></button>' +
        '<button type="button" data-z="close"><span aria-hidden="true">×</span><span class="sr-only">' + L({ cs: 'Zavřít', en: 'Close' }) + '</span></button>' +
      '</div>';
    document.body.appendChild(zoomer);

    var sc = zoomer.querySelector('.zoomer-scroll');
    var img = sc.querySelector('img');
    img.addEventListener('load', function () { if (!zoomer.hidden) setZoom(zoomLevel); });

    // mouse: drag to pan, click to zoom in at that point (at the last level, back to the whole sheet)
    var drag = null, dragged = false;
    sc.addEventListener('pointerdown', function (e) {
      dragged = false;
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { x: e.clientX, y: e.clientY, l: sc.scrollLeft, t: sc.scrollTop };
      e.preventDefault();
    });
    window.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 5) dragged = true;
      sc.scrollLeft = drag.l - dx; sc.scrollTop = drag.t - dy;
    });
    window.addEventListener('pointerup', function () { drag = null; });
    sc.addEventListener('click', function (e) {
      if (dragged) { dragged = false; return; }
      if (e.target !== img) { closeZoom(); return; }
      var k = ZOOM_LEVELS.indexOf(zoomLevel);
      setZoom(k < ZOOM_LEVELS.length - 1 ? ZOOM_LEVELS[k + 1] : 1, e.clientX, e.clientY);
    });

    zoomer.querySelector('[data-z="in"]').addEventListener('click', function () { stepZoom(1); });
    zoomer.querySelector('[data-z="out"]').addEventListener('click', function () { stepZoom(-1); });
    zoomer.querySelector('[data-z="close"]').addEventListener('click', closeZoom);
    zoomer.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.stopPropagation(); closeZoom(); }
      else if (e.key === '+' || e.key === '=') stepZoom(1);
      else if (e.key === '-') stepZoom(-1);
      else if (e.key === 'Tab') {               // keep focus inside the dialog
        var bs = zoomer.querySelectorAll('button'), first = bs[0], last = bs[bs.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  function stepZoom(d) {
    var k = Math.max(0, Math.min(ZOOM_LEVELS.length - 1, ZOOM_LEVELS.indexOf(zoomLevel) + d));
    setZoom(ZOOM_LEVELS[k]);
  }

  function setZoom(z, cx, cy) {
    var sc = zoomer.querySelector('.zoomer-scroll'), img = sc.querySelector('img');
    var a = aspectOf(img);
    if (!a) return;
    var r = img.getBoundingClientRect(), sr = sc.getBoundingClientRect();
    if (cx == null) { cx = sr.left + sr.width / 2; cy = sr.top + sr.height / 2; }
    var px = r.width ? Math.min(1, Math.max(0, (cx - r.left) / r.width)) : 0.5;
    var py = r.height ? Math.min(1, Math.max(0, (cy - r.top) / r.height)) : 0.5;
    var cs = getComputedStyle(sc);
    var availH = sc.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    var availW = sc.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    var fitH = Math.min(availH, availW / a);
    zoomLevel = z;
    img.style.height = Math.round(fitH * z) + 'px';
    img.style.width = Math.round(fitH * z * a) + 'px';
    var r2 = img.getBoundingClientRect();
    sc.scrollLeft += r2.left + px * r2.width - cx;
    sc.scrollTop += r2.top + py * r2.height - cy;
    zoomer.classList.toggle('zoomed', z > 1);
    zoomer.querySelector('.zoomer-level').textContent = z + '×';
    zoomer.querySelector('[data-z="out"]').disabled = z === ZOOM_LEVELS[0];
    zoomer.querySelector('[data-z="in"]').disabled = z === ZOOM_LEVELS[ZOOM_LEVELS.length - 1];
  }

  function openZoom(btn) {
    if (!zoomer) buildZoomer();
    zoomOpener = btn;
    var img = zoomer.querySelector('img');
    img.style.width = img.style.height = '';
    img.src = btn.getAttribute('data-zoom');
    img.alt = btn.getAttribute('data-alt');
    zoomer.setAttribute('aria-label', btn.getAttribute('data-alt'));
    zoomer.hidden = false;
    root.classList.add('zoom-open');
    zoomLevel = 1;
    if (img.complete) setZoom(1);
    zoomer.querySelector('[data-z="close"]').focus({ preventScroll: true });
  }

  function closeZoom() {
    if (!zoomer || zoomer.hidden) return;
    zoomer.hidden = true;
    root.classList.remove('zoom-open');
    if (zoomOpener) zoomOpener.focus({ preventScroll: true });
  }

  /* ---------- galleries behaviour ---------- */
  function initGalleries(scope) {
    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.querySelectorAll('img[data-src]').forEach(function (img) { img.src = img.getAttribute('data-src'); img.removeAttribute('data-src'); });
        io.unobserve(en.target);
      });
    }, { rootMargin: '600px 0px' }) : null;

    scope.querySelectorAll('[data-gallery]').forEach(function (g) {
      var n = +g.getAttribute('data-count');
      var track = g.querySelector('.gallery-track');
      var idxEl = g.querySelector('[data-idx]');
      var stage = g.querySelector('.gallery-stage');
      var isVideo = g.hasAttribute('data-video');
      var i = 0;

      if (io && !isVideo) io.observe(g);
      else g.querySelectorAll('img[data-src]').forEach(function (img) { img.src = img.getAttribute('data-src'); });

      var slideEls = g.querySelectorAll('.slide');

      function go(to) {
        if (isVideo) g.querySelectorAll('video').forEach(function (v) { v.pause(); });
        i = (to + n) % n;
        track.style.transform = 'translateX(' + (-100 * i) + '%)';
        idxEl.textContent = i + 1;
        g.classList.add('touched');
        if (!isVideo) { onSlide(g, slideEls[i]); sizeStage(g, i); }
      }

      if (isVideo) {
        g.querySelector('[data-prev]').addEventListener('click', function () { go(i - 1); });
        g.querySelector('[data-next]').addEventListener('click', function () { go(i + 1); });
        return;
      }

      g._index = function () { return i; };
      g.querySelectorAll('img').forEach(function (img) {
        img.addEventListener('load', function () { layoutGallery(g); });
      });
      layoutGallery(g);
      onSlide(g, slideEls[0]);

      // click = next; swipe left/right = next/prev; the zoom button opens the zoom view instead
      var startX = null, startY = null, moved = false;
      stage.addEventListener('pointerdown', function (e) { startX = e.clientX; startY = e.clientY; moved = false; });
      stage.addEventListener('pointerup', function (e) {
        if (startX === null) return;
        var dx = e.clientX - startX, dy = e.clientY - startY;
        startX = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { moved = true; go(dx < 0 ? i + 1 : i - 1); }
      });
      stage.addEventListener('pointercancel', function () { startX = null; });
      stage.addEventListener('click', function (e) {
        if (moved) { moved = false; return; }
        var z = e.target.closest('[data-zoom]');
        if (z) { openZoom(z); return; }
        go(i + 1);
      });
      stage.addEventListener('keydown', function (e) {
        if (e.target.closest('[data-zoom]')) return;
        if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(i + 1); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
      });
    });

    scope.querySelectorAll('[data-jump]').forEach(function (b) {
      b.addEventListener('click', function () {
        var el = document.getElementById(b.getAttribute('data-jump'));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function updateDynamicLabels() {
    var l = lang();
    document.querySelectorAll('[data-label-cs]').forEach(function (el) { el.setAttribute('aria-label', el.getAttribute('data-label-' + l)); });
    var route = currentRoute();
    var crumbs = {
      '': { cs: 'Portfolio', en: 'Portfolio' },
      'famu-cas': { cs: 'FAMU CAS', en: 'FAMU CAS' },
      'volna-tvorba': { cs: 'Volná tvorba', en: 'Independent work' },
      'galerie': GALERIE_TITLE,
      'kontakt': { cs: 'Kontakt', en: 'Contact' }
    };
    var c = crumbs[route] || crumbs[''];
    document.getElementById('crumb-label').textContent = c[l];
    document.title = route ? c[l] + ' — Tereza Muric' : 'Tereza Muric — ' + tr('vizuální umělec, filmař', 'visual artist, filmmaker');
  }

  /* ---------- router ---------- */
  function currentRoute() {
    var r = (location.hash || '').replace(/^#\/?/, '').split('/')[0];
    return (r === 'famu-cas' || r === 'volna-tvorba' || r === 'galerie' || r === 'kontakt') ? r : '';
  }

  var lastRoute = null;
  function render() {
    var r = currentRoute();
    if (r === lastRoute) return;
    lastRoute = r;
    closeZoom();
    if (r === 'famu-cas' || r === 'volna-tvorba' || r === 'galerie') app.innerHTML = renderChapter(r);
    else if (r === 'kontakt') app.innerHTML = renderContact();
    else app.innerHTML = renderHome();
    document.getElementById('back-arrow').hidden = (r === '');
    document.querySelectorAll('.menu a[data-route]').forEach(function (a) {
      if (a.getAttribute('data-route') === r) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    initGalleries(app);
    updateDynamicLabels();
    window.scrollTo(0, 0);
    app.classList.remove('enter'); void app.offsetWidth; app.classList.add('enter');
  }

  window.addEventListener('hashchange', render);
  setLang(lang());
  render();
})();
