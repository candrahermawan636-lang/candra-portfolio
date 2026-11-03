(() => {
  'use strict';
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;

  const drivePreview = (id) => `https://drive.google.com/file/d/${id}/preview`;

  function el(tag, attrs = {}, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === false || v == null) continue;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else n.setAttribute(k, v === true ? '' : v);
    }
    kids.flat().forEach((c) => c != null && n.append(c.nodeType ? c : document.createTextNode(c)));
    return n;
  }
  const media = (key) => S.media[key];

  /* ---------- media builders (local file first, Google Drive fallback) ---------- */
  function missing(m) {
    const file = (m.local || m.src || m.drive || 'media-file').split('/').pop();
    return el('div', { class: 'media-missing', role: 'img', 'aria-label': `Media placeholder: ${file}` },
      el('span', { class: 'media-missing__eyebrow mono', text: 'PORTFOLIO MEDIA' }),
      el('strong', { text: 'Project preview' }),
      el('span', { class: 'media-missing__file', text: `Add file: ${file}` }));
  }

  function buildImage(m, { eager = false } = {}) {
    const img = el('img', { alt: m.alt || '', decoding: 'async', loading: eager ? 'eager' : 'lazy' });
    img.addEventListener('error', () => img.replaceWith(missing(m)), { once: true });
    if (m.local) img.src = m.local; // images are always served from this project (/public/images)
    else img.replaceWith(missing(m));
    return img;
  }

  // Videos are hosted externally and embedded. Sources: youtube | drive | file (direct mp4 URL).
  function buildVideo(m) {
    const wrap = el('div', { class: 'video-frame', style: `--r:${m.ratio || '16/9'}` });
    const title = m.alt || 'Video';
    if (m.host === 'file' && m.src) {
      wrap.append(el('video', { controls: true, preload: 'metadata', playsinline: true, poster: m.poster, src: m.src, 'aria-label': title }));
    } else if (m.host === 'youtube' && m.youtube) {
      wrap.append(el('iframe', { src: `https://www.youtube-nocookie.com/embed/${m.youtube}?rel=0`, title, loading: 'lazy', allow: 'fullscreen; picture-in-picture; encrypted-media', allowfullscreen: true, referrerpolicy: 'strict-origin-when-cross-origin' }));
    } else if (m.drive) {
      wrap.append(el('iframe', { src: drivePreview(m.drive), title, loading: 'lazy', allow: 'fullscreen; picture-in-picture', allowfullscreen: true, referrerpolicy: 'no-referrer' }));
    } else {
      wrap.append(missing(m));
    }
    return wrap;
  }

  function buildMedia(m, opts) { return m.type === 'video' ? buildVideo(m, opts) : buildImage(m, opts); }

  /* ---------- lazy mount ---------- */
  const mountIO = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      mountIO.unobserve(e.target);
      e.target._mount && e.target._mount();
    });
  }, { rootMargin: '300px' }) : null;
  function lazyMount(node, fn) {
    node._mount = fn;
    mountIO ? mountIO.observe(node) : fn();
  }

  /* ---------- hero ---------- */
  function renderHero() {
    const h = S.hero;
    $('#heroLabel').textContent = h.label;
    $('#heroTitle').append(...h.headline.map((t, i) => el('span', { class: 'line' }, el('span', { style: `--i:${i}`, text: t }))));
    $('#heroDesc').textContent = h.description;
    $('#ctaPrimary').textContent = h.primaryCta;
    $('#ctaSecondary').textContent = h.secondaryCta;
    $('#heroImg').append(buildImage(media('profile'), { eager: true }));
    $('#heroLoc').textContent = S.location.split(',')[0] + ', ID';
    const clock = $('#heroClock');
    const tick = () => {
      try {
        clock.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: S.timezone }).format(new Date()) + ' WIB';
      } catch (_) { clock.textContent = ''; }
    };
    tick(); setInterval(tick, 30000);
  }

  function renderStats() {
    $('#stats').append(...S.stats.map((s, i) => el('li', { class: 'reveal', style: `--d:${i * 0.1}s` },
      el('div', { class: 'stat__num' }, el('span', { 'data-count': s.value, text: reduce ? String(s.value) : '0' }), el('small', { text: s.unit })),
      el('p', { class: 'stat__label', text: s.label }))));
  }

  function renderAbout() {
    $('#aboutLead').textContent = S.about.title;
    $('#aboutText').append(...S.about.paragraphs.map((p) => el('p', { text: p })));
    $('#pillars').append(...S.about.pillars.map((p, i) => el('li', { class: 'reveal', style: `--d:${i * 0.1}s` }, el('b', { text: p.title }), el('span', { text: p.text }))));
  }

  function renderExperience() {
    $('#timeline').append(...S.experience.map((x) => el('li', { class: 'reveal' },
      el('div', {}, el('h3', { class: 'tl__org', text: x.org }), el('p', { class: 'tl__meta mono', text: x.meta })),
      el('div', {}, el('p', { class: 'tl__role', text: x.role }), el('ul', { class: 'tl__points' }, x.points.map((p) => el('li', { text: p })))))));
  }

  /* ---------- projects ---------- */
  function renderProjects() {
    const cats = ['All', ...new Set(S.projects.map((p) => p.category))];
    const filters = $('#filters');
    cats.forEach((c, i) => {
      const b = el('button', { class: 'filter', type: 'button', 'aria-pressed': String(i === 0), text: c, 'data-cursor': 'hover' });
      b.addEventListener('click', () => {
        $$('.filter', filters).forEach((f) => f.setAttribute('aria-pressed', String(f === b)));
        $$('.card').forEach((card) => card.classList.toggle('is-hidden', c !== 'All' && card.dataset.cat !== c));
      });
      filters.append(b);
    });

    const grid = $('#cards');
    S.projects.forEach((p, i) => {
      const first = p.media.length ? media(p.media[0]) : null;
      const prev = el('div', { class: 'card__media' + (first && first.type === 'image' ? (first.fit === 'contain' ? ' is-contain' : ' is-cover') : '') });
      if (first) {
        if (first.type === 'video') {
          prev.classList.add('is-cover');
          if (first.poster) lazyMount(prev, () => prev.prepend(buildImage({ ...first, local: first.poster })));
          else prev.append(el('div', { class: 'card__empty card__empty--video', 'aria-hidden': 'true', text: p.id }));
          prev.append(el('span', { class: 'play', 'aria-hidden': 'true' }));
        } else {
          lazyMount(prev, () => prev.prepend(buildImage(first)));
        }
      } else {
        prev.append(el('div', { class: 'card__empty', 'aria-hidden': 'true', text: p.id }));
      }
      prev.append(el('span', { class: 'badge', text: `Project ${p.id}` }));

      const card = el('button', { class: 'card reveal', type: 'button', 'data-cat': p.category, 'data-cursor': 'hover', 'aria-haspopup': 'dialog', 'aria-label': `View project: ${p.title}`, style: `--d:${(i % 3) * 0.08}s` },
        prev,
        el('div', { class: 'card__body' },
          el('div', { class: 'card__top' }, el('span', { class: 'mono', text: p.category }), p.media.length ? el('span', { class: 'mono', text: `${p.media.length} media` }) : null),
          el('h3', { class: 'card__title', text: p.title }),
          el('p', { class: 'card__desc', text: p.short }),
          el('ul', { class: 'tags' }, p.tools.map((t) => el('li', { text: t }))),
          el('span', { class: 'card__cta' }, 'View Project', el('i', { text: '→' }))));
      card.addEventListener('click', () => openProject(p, card));
      grid.append(card);
    });
  }

  /* project dialog */
  const pd = $('#projectDialog');
  let pdFocus = null;
  function openProject(p, trigger) {
    pdFocus = trigger;
    $('#pdCat').textContent = `${p.category} — Project ${p.id}`;
    $('#pdTitle').textContent = p.title;
    $('#pdLong').textContent = p.long;
    $('#pdTools').replaceChildren(...p.tools.map((t) => el('li', { text: t })));
    $('#pdNote').hidden = p.media.length > 0;
    const list = p.media.map(media);
    const thumbs = $('#pdThumbs');
    thumbs.replaceChildren();
    const select = (idx) => {
      const m = list[idx];
      const stage = $('#pdStage');
      stage.querySelectorAll('video').forEach((v) => v.pause());
      stage.replaceChildren();
      const node = buildMedia(m, { eager: true });
      if (m.type === 'image') {
        node.addEventListener('click', () => openLightbox(list.filter((x) => x.type === 'image'), m));
        node.title = 'Click to enlarge';
      }
      stage.append(node);
      $('#pdCaption').textContent = m.caption || '';
      $$('.thumb', thumbs).forEach((t, i) => t.setAttribute('aria-selected', String(i === idx)));
    };
    list.forEach((m, i) => {
      const t = el('button', { class: 'thumb' + (m.type === 'video' ? ' thumb--video' : ''), type: 'button', role: 'tab', 'aria-label': m.caption || m.alt, 'aria-selected': 'false' });
      if (m.type === 'video') t.append('▶ VIDEO'); else t.append(buildImage(m));
      t.addEventListener('click', () => select(i));
      thumbs.append(t);
    });
    thumbs.hidden = list.length < 2;
    $('#pdStage').replaceChildren();
    $('#pdCaption').textContent = '';
    if (list.length) select(0);
    else $('#pdStage').append(el('div', { class: 'card__empty', style: 'position:static;width:100%;height:100%;min-height:240px', text: p.id }));
    pd.showModal();
    document.body.style.overflow = 'hidden';
  }
  function closeProject() { pd.close(); }
  pd.addEventListener('close', () => {
    $('#pdStage').querySelectorAll('video').forEach((v) => v.pause());
    $('#pdStage').replaceChildren();
    document.body.style.overflow = '';
    pdFocus && pdFocus.focus({ preventScroll: true });
  });
  $('#pdClose').addEventListener('click', closeProject);
  pd.addEventListener('click', (e) => { if (e.target === pd) closeProject(); });

  /* lightbox */
  const lb = $('#lightbox');
  let lbList = [], lbIdx = 0;
  function showLb() {
    const m = lbList[lbIdx];
    $('#lbImgWrap').replaceChildren(buildImage(m, { eager: true }));
    $('#lbCap').textContent = `${m.caption || ''}  ${lbList.length > 1 ? `· ${lbIdx + 1}/${lbList.length}` : ''}`;
    $('#lbPrev').hidden = $('#lbNext').hidden = lbList.length < 2;
  }
  function openLightbox(list, current) { lbList = list; lbIdx = Math.max(0, list.indexOf(current)); showLb(); lb.showModal(); }
  const lbStep = (d) => { lbIdx = (lbIdx + d + lbList.length) % lbList.length; showLb(); };
  $('#lbPrev').addEventListener('click', () => lbStep(-1));
  $('#lbNext').addEventListener('click', () => lbStep(1));
  $('#lbClose').addEventListener('click', () => lb.close());
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') lbStep(-1); if (e.key === 'ArrowRight') lbStep(1); });

  /* ---------- expertise / tools / contact ---------- */
  function renderExpertise() {
    $('#expertise').append(...S.expertise.map((g, i) => el('div', { class: 'ex reveal', style: `--d:${i * 0.08}s` },
      el('h3', {}, g.title, el('span', { text: String(i + 1).padStart(2, '0') })),
      el('ul', {}, g.items.map((t) => el('li', { text: t }))))));
  }
  function renderTools() {
    $('#toolsGrid').append(...S.tools.map((t, i) => el('li', { class: 'reveal', style: `--d:${(i % 6) * 0.05}s` },
      el('span', { class: 'mono', text: String(i + 1).padStart(2, '0') }), el('b', { text: t }))));
  }
  function renderContact() {
    const c = S.contact;
    $('#contactTitle').append(...c.headline.map((t) => el('span', { text: t })));
    const items = [
      ['Email', c.email, c.email && `mailto:${c.email}`, c.email],
      ['WhatsApp', c.whatsapp, c.whatsapp, c.whatsapp && 'Message me'],
      ['LinkedIn', c.linkedin, c.linkedin, c.linkedin && 'View profile'],
      ['GitHub', c.github, c.github, c.github && 'View profile'],
    ];
    const available = items.filter(([, val]) => Boolean(val));
    if (available.length) {
      $('#contactList').append(...available.map(([label, val, href, text], i) => {
        const inner = [el('span', { class: 'mono', text: label }), el('b', { text })];
        return el('li', { class: 'reveal', style: `--d:${i * 0.08}s` },
          el('a', { class: 'contact__item', href, target: href.startsWith('mailto') ? null : '_blank', rel: 'noopener noreferrer', 'data-cursor': 'hover' }, inner));
      }));
    } else {
      $('#contactList').append(el('li', { class: 'reveal contact__empty' },
        el('div', { class: 'contact__item' },
          el('span', { class: 'mono', text: 'PROFESSIONAL ENQUIRIES' }),
          el('b', { text: 'Contact details available on request.' }))));
    }
    $('#footName').textContent = `© ${new Date().getFullYear()} ${S.name}`;
  }

  /* ---------- interactions ---------- */
  function setupReveal() {
    const items = $$('.reveal');
    if (reduce || !('IntersectionObserver' in window)) { items.forEach((i) => i.classList.add('in')); countersNow(); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
      $$('[data-count]', e.target).forEach(runCounter);
    }), { threshold: 0.12 });
    items.forEach((i) => io.observe(i));
  }
  function runCounter(n) {
    const target = +n.dataset.count; const t0 = performance.now(); const dur = 1300;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      n.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function countersNow() { $$('[data-count]').forEach((n) => (n.textContent = n.dataset.count)); }

  function setupNav() {
    const nav = $('#nav'); const toggle = $('#navToggle'); const links = $('#navLinks');
    const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 20);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const setOpen = (o) => {
      links.classList.toggle('is-open', o);
      toggle.setAttribute('aria-expanded', String(o));
      toggle.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
      document.body.style.overflow = o ? 'hidden' : '';
      if (o) links.querySelector('a')?.focus({ preventScroll: true });
      else toggle.focus({ preventScroll: true });
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    $$('a', links).forEach((a) => a.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    }));
    addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    if ('IntersectionObserver' in window) {
      const map = new Map($$('a', links).map((a) => [a.getAttribute('href').slice(1), a]));
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { map.forEach((a) => a.classList.remove('is-active')); const a = map.get(e.target.id); a && a.classList.add('is-active'); }
      }), { rootMargin: '-45% 0px -50% 0px' });
      map.forEach((_, id) => { const s = document.getElementById(id); s && io.observe(s); });
    }
  }

  function setupParallax() {
    if (reduce) return;
    const items = $$('[data-parallax]'); let ticking = false;
    const update = () => { items.forEach((n) => { const r = n.getBoundingClientRect(); if (r.bottom < -200 || r.top > innerHeight + 200) return; n.style.transform = `translate3d(0,${(scrollY * parseFloat(n.dataset.parallax)).toFixed(1)}px,0)`; }); ticking = false; };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  }

  function setupCursor() {
    if (!finePointer || reduce) return;
    document.documentElement.classList.add('has-cursor');
    const c = $('#cursor'); const dot = $('.cursor__dot', c); const ring = $('.cursor__ring', c);
    // A multi-point, eased trail gives the cursor the layered motion from the reference.
    const followers = Array.from({ length: 9 }, (_, i) => {
      const node = document.createElement('i');
      node.className = 'cursor__follower';
      node.style.setProperty('--i', i);
      c.append(node);
      return { node, x: innerWidth / 2, y: innerHeight / 2 };
    });
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    let lastSpark = 0, lastX = x, lastY = y;
    addEventListener('pointermove', (e) => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate3d(${x}px,${y}px,0)`;
      const distance = Math.hypot(x - lastX, y - lastY);
      if (distance > 13 && performance.now() - lastSpark > 24) {
        const spark = document.createElement('i');
        spark.className = 'cursor__spark';
        spark.style.left = `${x}px`; spark.style.top = `${y}px`;
        c.append(spark);
        spark.addEventListener('animationend', () => spark.remove(), { once: true });
        lastSpark = performance.now(); lastX = x; lastY = y;
      }
    }, { passive: true });
    const loop = () => {
      rx += (x - rx) * 0.14; ry += (y - ry) * 0.14;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      followers.forEach((f, i) => {
        const prev = i === 0 ? { x: rx, y: ry } : followers[i - 1];
        f.x += (prev.x - f.x) * (0.22 - i * 0.012);
        f.y += (prev.y - f.y) * (0.22 - i * 0.012);
        f.node.style.transform = `translate3d(${f.x}px,${f.y}px,0)`;
      });
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('pointerover', (e) => c.classList.toggle('is-hover', !!e.target.closest('a,button,[data-cursor],.stage img')));
  }

  function setupLoader() {
    const bar = $('#loaderBar'); const pct = $('#loaderPct'); let p = 0; const t0 = performance.now(); let loaded = document.readyState === 'complete';
    addEventListener('load', () => { loaded = true; });
    const tick = () => {
      const minDone = performance.now() - t0 > (reduce ? 0 : 900);
      p = Math.min(loaded && minDone ? 100 : 92, p + (loaded ? 6 : 2));
      bar.style.width = p + '%'; pct.textContent = String(Math.round(p)).padStart(2, '0');
      if (p >= 100) { document.documentElement.classList.add('is-loaded'); setTimeout(() => $('#loader').remove(), 900); return; }
      setTimeout(tick, 40);
    };
    tick();
    setTimeout(() => document.documentElement.classList.add('is-loaded'), 5000); // safety net
  }

  /* ---------- init ---------- */
  renderHero(); renderStats(); renderAbout(); renderExperience(); renderProjects(); renderExpertise(); renderTools(); renderContact();
  setupReveal(); setupNav(); setupParallax(); setupCursor(); setupLoader();
  setTimeout(() => $$('.hero .reveal').forEach((n) => n.classList.add('in')), 120);
})();
