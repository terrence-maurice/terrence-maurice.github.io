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
        '<blockquote class="hero-quote"><p>' + L({
          cs: 'Jednou jsi součástí audiovize – navždy jsi součástí audiovize. Máš prostě zvukové vize...vize se zvukem! Kapiš?',
          en: 'Once you’re part of audiovision – you’re part of audiovision forever. You simply have sound visions...visions with sound! Get it?'
        }) + '</p></blockquote>' +
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
  var GALERIE_TITLE = { cs: 'Galerie pohyblivého obrazu', en: 'Moving Image Gallery' };

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
    var en = s.en.replace(' end-of-semester exam', '').replace(' — Cinema and Digital Media', '');
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
    var h = '<article class="work"' + (w.id ? ' id="work-' + w.id + '" data-work="' + w.id + '"' : '') + '>';
    h += '<h3 class="work-title">' + L(w.title) + '</h3>';
    if (w.page) h += '<a class="text-link" href="#/text/' + w.id + '">Text <span aria-hidden="true">→</span></a>';
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
    var slides = g.images.map(function (name, i) {
      return '<div class="slide"><img ' + (i === 0 ? 'src' : 'data-src') + '="' + g.base + name + '.webp" alt="' + label + ' — ' + (i + 1) + '/' + g.images.length + '" decoding="async"' + (i === 0 ? ' loading="lazy"' : '') + '></div>';
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
        '<span class="track-name">' + L(t[1]) + '</span>' +
        '<audio controls preload="none" src="' + a.base + t[0] + '.m4a" aria-label="' + plain(t[1]) + '"></audio></li>';
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
  var viewH = window.innerHeight, viewW = window.innerWidth;

  function aspectOf(img) { return img && img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 0; }

  function layoutGallery(g) {
    var stage = g.querySelector('.gallery-stage');
    var W = stage.clientWidth;
    if (!W) return;
    var Hmax = Math.round(viewH * 0.82);
    var imgs = Array.prototype.slice.call(g.querySelectorAll('.slide img'));
    var known = imgs.filter(aspectOf);
    var A = 0;
    known.forEach(function (img) { var a = aspectOf(img), h = Math.min(Hmax, W / a); A += h * h * a; });
    if (known.length) A /= known.length;
    var maxH = 0;
    imgs.forEach(function (img) {
      var a = aspectOf(img) || 1.5;
      var h = Math.min(A ? Math.sqrt(A / a) : Hmax, Hmax, W / a);
      img.style.width = Math.round(h * a) + 'px';
      img.style.height = Math.round(h) + 'px';
      maxH = Math.max(maxH, Math.round(h));
    });
    // the stage keeps the height of the gallery's tallest image, so the page doesn't jump while clicking through
    stage.style.height = (maxH || Math.min(Hmax, Math.round(W / 1.5))) + 'px';
  }

  window.addEventListener('resize', function () {
    clearTimeout(window._galleryResize);
    window._galleryResize = setTimeout(function () {
      // mobile browsers fire resize while the address bar hides; only re-measure on a real size change
      if (window.innerWidth === viewW && Math.abs(window.innerHeight - viewH) < 160) return;
      viewW = window.innerWidth; viewH = window.innerHeight;
      app.querySelectorAll('[data-gallery]:not([data-video])').forEach(layoutGallery);
    }, 120);
  });

  /* ---------- print sheet (Smrt auta) ----------
     Prapor vyjede z horní lišty jako papír z tiskárny, skoro přes celou šířku okna. Dá se v něm scrollovat dolů;
     když dojede na konec, zmizí a pod ním je zase kapitola. Spouští se kliknutím na tlačítko roku
     jeho sekce („2024 Zimní“), odkazem #/famu-cas/<id> a jednou při každém otevření kapitoly, když doscrollujete
     k jeho sekci („2024 Zimní klauzura“).
     The banner slides out of the top bar like paper from a printer, almost as wide as the window. You scroll down
     through it; once its end has passed, it disappears and the chapter is back. It opens from the
     year button of its section, a #/famu-cas/<id> link, and once per chapter visit when you scroll to its section. */
  var sheet = null, sheetOpener = null, sheetDone = {}, sheetWatch = [];
  var sheetQuietUntil = 0;     // a year button's smooth scroll passing over a section doesn't open its sheet

  function findWork(id) {
    var found = null;
    Object.keys(CHAPTERS).forEach(function (key) {
      CHAPTERS[key].sections.forEach(function (s) {
        s.works.forEach(function (w) { if (w.id === id) found = { work: w, chapter: key }; });
      });
    });
    return found;
  }

  function buildSheet() {
    sheet = document.createElement('div');
    sheet.className = 'sheet';
    sheet.hidden = true;
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-modal', 'true');
    sheet.innerHTML = '<span class="sheet-slot" aria-hidden="true"></span>' +
      '<div class="sheet-clip"><div class="sheet-scroll" tabindex="-1"><div class="sheet-paper"><img alt="" draggable="false"></div><div class="sheet-tail" aria-hidden="true"></div></div></div>' +
      '<button type="button" class="sheet-close"><span aria-hidden="true">×</span><span class="sr-only">' + L({ cs: 'Zavřít', en: 'Close' }) + '</span></button>';
    document.body.appendChild(sheet);
    var sc = sheet.querySelector('.sheet-scroll'), paper = sheet.querySelector('.sheet-paper');
    sc.addEventListener('scroll', function () {
      // how much of the sheet is still below the slot; the dark background fades out with the last screenful
      var rest = paper.getBoundingClientRect().bottom - sc.getBoundingClientRect().top;
      sheet.style.setProperty('--fade', Math.max(0, Math.min(1, rest / sc.clientHeight)).toFixed(3));
      if (rest <= 2) closeSheet();
    }, { passive: true });
    sheet.querySelector('.sheet-close').addEventListener('click', closeSheet);
    sheet.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.stopPropagation(); closeSheet(); }
    });
  }

  function openSheet(id, opener) {
    var f = findWork(id);
    if (!f || !f.work.print) return;
    if (!sheet) buildSheet();
    sheetDone[id] = true;
    sheetOpener = opener || null;
    var p = f.work.print, img = sheet.querySelector('img');
    if (img.getAttribute('src') !== p.src) {
      img.width = p.w; img.height = p.h;
      img.src = p.src;
    }
    img.alt = plain(f.work.title);
    sheet.setAttribute('aria-label', plain(f.work.title));
    sheet.style.setProperty('--fade', 1);
    sheet.hidden = false;
    root.classList.add('sheet-open');
    var sc = sheet.querySelector('.sheet-scroll');
    sc.scrollTop = 0;
    sheet.classList.remove('printing');
    void sheet.offsetWidth;
    sheet.classList.add('printing');
    sc.focus({ preventScroll: true });
  }

  function closeSheet() {
    if (!sheet || sheet.hidden) return;
    sheet.hidden = true;
    sheet.classList.remove('printing');
    root.classList.remove('sheet-open');
    if (sheetOpener && document.body.contains(sheetOpener)) sheetOpener.focus({ preventScroll: true });
    sheetOpener = null;
  }

  // chapter wiring for each work with a print sheet:
  // - the year button of its section (e.g. "2024 Zimní") jumps to the section and opens the sheet;
  // - scrolling down to its section (heading reaches the middle of the screen) opens it once per chapter visit.
  function checkSheets() {
    if ((sheet && !sheet.hidden) || Date.now() < sheetQuietUntil) return;
    var vh = window.innerHeight;
    sheetWatch.forEach(function (w) {
      var r = w.section.getBoundingClientRect();
      if (!w.preloaded && r.top < vh + 1500) { w.preloaded = true; var im = new Image(); im.src = w.src; }
      // the section heading has reached the middle of the screen and the section still fills the middle
      if (!sheetDone[w.id] && r.top <= vh * 0.5 && r.bottom > vh * 0.5) openSheet(w.id, null);
    });
  }
  window.addEventListener('scroll', checkSheets, { passive: true });

  function initSheets(scope) {
    sheetWatch = [];
    scope.querySelectorAll('[data-work]').forEach(function (el) {
      var id = el.getAttribute('data-work');
      var f = findWork(id);
      if (!f || !f.work.print) return;
      var section = el.closest('.period');
      if (!section) return;
      section.setAttribute('data-sheet-for', id);
      var jump = scope.querySelector('[data-jump="' + section.id + '"]');
      if (jump) jump.addEventListener('click', function () {
        section.scrollIntoView({ block: 'start' });     // jump at once (no smooth scroll), then slide the sheet out
        openSheet(id, jump);
      });
      sheetWatch.push({ id: id, section: section, src: f.work.print.src, preloaded: false });
    });
  }

  /* ---------- text page ---------- */
  function renderText(id) {
    var f = findWork(id);
    if (!f || !f.work.page) return renderHome();
    var back = '<a class="back-link" href="#/' + f.chapter + '/' + id + '"><span class="arrow" aria-hidden="true">←</span>' + L(f.work.title) + '</a>';
    // the title is part of the text (as in the author's PDF); the page uses the site's own type
    return '' +
      '<div class="page-head page-head-text">' + back + '</div>' +
      '<article class="text-page"><div class="l-cs" lang="cs">' + f.work.page.cs.join('') + '</div>' +
        '<div class="l-en" lang="en">' + f.work.page.en.join('') + '</div></article>' +
      '<div class="page-end">' + back + '</div>';
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

      function go(to) {
        if (isVideo) g.querySelectorAll('video').forEach(function (v) { v.pause(); });
        i = (to + n) % n;
        track.style.transform = 'translateX(' + (-100 * i) + '%)';
        idxEl.textContent = i + 1;
        g.classList.add('touched');
      }

      if (isVideo) {
        g.querySelector('[data-prev]').addEventListener('click', function () { go(i - 1); });
        g.querySelector('[data-next]').addEventListener('click', function () { go(i + 1); });
        return;
      }

      g.querySelectorAll('img').forEach(function (img) {
        img.addEventListener('load', function () { layoutGallery(g); });
      });
      layoutGallery(g);

      // click = next; swipe left/right = next/prev
      var startX = null, startY = null, moved = false;
      stage.addEventListener('pointerdown', function (e) { startX = e.clientX; startY = e.clientY; moved = false; });
      stage.addEventListener('pointerup', function (e) {
        if (startX === null) return;
        var dx = e.clientX - startX, dy = e.clientY - startY;
        startX = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { moved = true; go(dx < 0 ? i + 1 : i - 1); }
      });
      stage.addEventListener('pointercancel', function () { startX = null; });
      stage.addEventListener('click', function () { if (moved) { moved = false; return; } go(i + 1); });
      stage.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(i + 1); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
      });
    });

    scope.querySelectorAll('[data-jump]').forEach(function (b) {
      b.addEventListener('click', function () {
        var el = document.getElementById(b.getAttribute('data-jump'));
        sheetQuietUntil = Date.now() + 1500;
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
    var textWork = route === 'text' ? findWork(routeSub()) : null;
    if (textWork) c = crumbs[textWork.chapter];
    document.getElementById('crumb-label').textContent = c[l];
    document.title = textWork ? plain(textWork.work.title) + ' — Tereza Muric'
      : route ? c[l] + ' — Tereza Muric' : 'Tereza Muric — ' + tr('vizuální umělec, filmař', 'visual artist, filmmaker');
  }

  /* ---------- router ----------
     #/<chapter>, #/<chapter>/<work id> (scrolls to the work; a work with a print sheet opens it), #/text/<work id> */
  function currentRoute() {
    var r = (location.hash || '').replace(/^#\/?/, '').split('/')[0];
    return (r === 'famu-cas' || r === 'volna-tvorba' || r === 'galerie' || r === 'kontakt' || r === 'text') ? r : '';
  }
  function routeSub() { return (location.hash || '').replace(/^#\/?/, '').split('/')[1] || ''; }

  var lastRoute = null, lastSub = null;
  function render() {
    var r = currentRoute(), sub = routeSub();
    if (r === lastRoute && sub === lastSub) return;
    var prevRoute = lastRoute, prevSub = lastSub;
    var samePage = r === lastRoute && r !== 'text';
    lastRoute = r; lastSub = sub;
    closeSheet();
    if (!samePage) {
      if (r === 'famu-cas' || r === 'volna-tvorba' || r === 'galerie') app.innerHTML = renderChapter(r);
      else if (r === 'kontakt') app.innerHTML = renderContact();
      else if (r === 'text') app.innerHTML = renderText(sub);
      else app.innerHTML = renderHome();
      document.getElementById('back-arrow').hidden = (r === '');
      document.querySelectorAll('.menu a[data-route]').forEach(function (a) {
        if (a.getAttribute('data-route') === r) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      });
      sheetDone = {};
      initGalleries(app);
      initSheets(app);
      updateDynamicLabels();
      window.scrollTo(0, 0);
      app.classList.remove('enter'); void app.offsetWidth; app.classList.add('enter');
    }
    // #/<chapter>/<work>: go to the work and slide its sheet out; back from a text page: return to that work quietly
    var fromText = prevRoute === 'text' && r !== 'text';
    var workId = r === 'text' ? '' : (sub || (fromText ? prevSub : ''));
    var el = workId ? document.getElementById('work-' + workId) : null;
    if (el) {
      el.scrollIntoView({ block: 'start' });
      if (fromText) sheetDone[workId] = true;
      else openSheet(workId, null);
    }
  }

  window.addEventListener('hashchange', render);
  setLang(lang());
  render();
})();
