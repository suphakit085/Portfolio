(() => {
  const D = window.PORTFOLIO;
  const C = window.CORE;
  const { esc, img, rich } = C;
  const PR = window.PROJECTS;
  const P = Object.fromEntries(PR.map((p) => [p.slug, p]));
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = matchMedia('(min-width: 961px)');
  const url = (slug) => `/projects/${slug}`;

  let L = C.lang;
  const t = (v) => C.t(v, L);
  const ui = (k, vars) => C.ui(k, L, vars);
  const badge = (s) => C.badge(s, L);

  $$('[data-href]').forEach((el) => { el.href = D.links[el.dataset.href]; });

  /* =========================================================
     HERO
     ========================================================= */
  const hero = $('#hero');
  const mobilePos = { 'thai-law-rag': [-6, 9], nutrilift: [68, 7] };
  function renderHeroCards() {
    $('#heroCards').innerHTML = D.heroCards.map(([key, x, y, r, w, d, hideSm], i) => {
      const isMe = key === 'portrait';
      const pr = P[key];
      const src = isMe ? D.profile.avatar : img(pr.cover, 'sm');
      const title = isMe ? 'Suphakit' : pr.title;
      const sub = isMe ? 'CS @ KKU · Khon Kaen' : `${pr.stack[0]} · ${pr.year}`;
      const sx = (x < 50 ? -1 : 1) * (260 + d * 6);
      const sy = (y < 50 ? -1 : 1) * (120 + d * 4);
      const [xm, ym] = mobilePos[key] || [x, y];
      return `<div class="hcard${hideSm ? ' hide-sm' : ''}" style="--x:${x}%;--y:${y}%;--xm:${xm}%;--ym:${ym}%;--r:${r}deg;--w:${w}px;--d:${d};--sx:${sx};--sy:${sy};--i:${i}">
        <div class="hcard-pop" style="--fx:${(50 - x) * 6}px;--fy:${(50 - y) * 4}px">
          <div class="hcard-in">
            <div class="hcard-cover" style="--c:${isMe ? '#eee' : pr.color}"><img src="${src}" alt="" decoding="async"></div>
            <div class="hcard-meta"><img src="${D.profile.avatar}" alt=""><div><b>${esc(title)}</b><small>${esc(sub)}</small></div></div>
          </div>
        </div>
      </div>`;
    }).join('');
  }
  renderHeroCards();

  let counted = false;
  function renderStats() {
    $('#heroStats').innerHTML = D.heroStats.map((s) => {
      const v = counted ? s.value.toFixed(s.decimals || 0) : '0';
      return `<div class="stat-chip"><b data-to="${s.value}" data-dec="${s.decimals || 0}">${v}</b><small>${esc(t(s.label))}</small></div>`;
    }).join('');
  }
  function countUp() {
    $$('#heroStats b').forEach((el, i) => {
      const to = +el.dataset.to, dec = +el.dataset.dec;
      if (reduced) { el.textContent = to.toFixed(dec); return; }
      const t0 = performance.now() + 500 + i * 90, dur = 1400;
      const tick = (now) => {
        const k = clamp((now - t0) / dur);
        el.textContent = (to * (1 - Math.pow(1 - k, 4))).toFixed(dec);
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    counted = true;
  }

  // mouse parallax (smoothed)
  let tx = 0, ty = 0, cx = 0, cy = 0;
  if (!reduced) {
    addEventListener('pointermove', (e) => {
      tx = (e.clientX / innerWidth - 0.5) * 2;
      ty = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
    (function loop() {
      cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
      if (scrollY < innerHeight * 1.2) {
        hero.style.setProperty('--mx', cx.toFixed(3));
        hero.style.setProperty('--my', cy.toFixed(3));
      }
      requestAnimationFrame(loop);
    })();
  }

  /* =========================================================
     STORY — word-by-word reveal tied to scroll
     ========================================================= */
  const storyText = $('#storyText');
  let words = [];
  function renderStory() {
    storyText.innerHTML = t(D.profile.story).split(/\s+/).map((w) => `<span class="w">${esc(w)}</span>`).join(' ');
    words = $$('.w', storyText);
  }

  /* =========================================================
     SHOWCASE
     ========================================================= */
  const cats = D.showcase;
  const track = $('#showcaseTrack');
  const card = $('#profileCard');
  const navList = $('#showcaseNav');
  const bar = $('#showcaseBar');
  track.style.setProperty('--n', cats.length);
  let active = -1;
  let tab = 'works';
  const TABS = ['works', 'skills', 'exp', 'about'];

  navList.innerHTML = cats.map((c, i) => `<li><button type="button" data-i="${i}">${esc(c.label)}</button></li>`).join('');
  navList.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    const i = +b.dataset.i;
    if (desktop.matches) {
      const top = track.getBoundingClientRect().top + scrollY;
      const span = track.offsetHeight - innerHeight;
      scrollTo({ top: top + span * ((i + 0.5) / cats.length), behavior: reduced ? 'auto' : 'smooth' });
    } else {
      setCategory(i);
    }
  });

  const ratios = ['4 / 5', '4 / 3', '1 / 1', '3 / 4', '16 / 11', '4 / 5'];
  function worksPane(c) {
    const others = PR.map((p) => p.slug).filter((k) => !c.works.includes(k)).slice(0, 2);
    const tiles = [...c.works, ...others].map((k, i) => {
      const p = P[k];
      return `<a class="m-item" href="${url(k)}" style="--ar:${ratios[i]};background:${p.color}">
        <img src="${img(p.cover, 'sm')}" alt="${esc(p.title)}" loading="lazy">
        <span class="m-cap">${esc(p.title)}<small>${p.year}</small></span></a>`;
    });
    tiles.splice(1, 0, `<div class="m-item m-note">
      <div class="who"><img src="${D.profile.avatar}" alt="">Suphakit · ${esc(ui('pc.note'))}</div>
      <h4>${esc(t(c.note.title))}</h4><p>${esc(t(c.note.body))}</p></div>`);
    const side = c.works.map((k) => {
      const p = P[k];
      return `<a class="s-item" href="${url(k)}">
        <img src="${img(p.cover, 'sm')}" alt="" loading="lazy">
        <div><b>${esc(p.title)}</b><small>${p.year} · ${esc(p.stack.slice(0, 2).join(', '))}</small>
        <div class="metric">${badge(p.status)}</div>
        <div class="metric">★ ${esc(t(p.metric))}</div></div></a>`;
    }).join('');
    return `<div class="pc-grid">
      <div class="masonry">${tiles.join('')}</div>
      <aside><div class="side-head"><h4>${esc(ui('pc.key'))}</h4><a href="${D.links.githubRepos}" target="_blank" rel="noopener">${esc(ui('pc.all'))}</a></div>
      <div class="side-list">${side}</div></aside></div>`;
  }
  function skillsPane(c) {
    return `<div class="about-pane"><div>
        <p style="margin-bottom:16px">${esc(c.headline)}</p>
        <div class="skill-cloud">${c.skills.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div>
      </div>
      <div class="side-list">${c.works.map((k) => `<a class="s-item" href="${url(k)}"><img src="${img(P[k].cover, 'sm')}" alt="" loading="lazy"><div><b>${esc(P[k].title)}</b><small>${esc(P[k].stack.join(' · '))}</small></div></a>`).join('')}</div>
    </div>`;
  }
  function expPane() {
    return `<div class="exp-mini">${D.experience.map((e) => `<div><small>${e.kind} · ${esc(t(e.where))}</small><b>${esc(e.title)} — ${esc(e.org)}</b><small>${esc(t(e.points)[0])}</small></div>`).join('')}</div>`;
  }
  function aboutPane() {
    const pf = D.profile;
    return `<div class="about-pane"><p>${esc(t(pf.intro))}</p>
      <dl class="kv">
        <dt>${esc(ui('kv.name'))}</dt><dd>${esc(pf.name)}</dd>
        <dt>GitHub</dt><dd><a href="${D.links.github}" target="_blank" rel="noopener">${esc(pf.handle)}</a></dd>
        <dt>${esc(ui('kv.uni'))}</dt><dd>${esc(pf.university)}</dd>
        <dt>${esc(ui('kv.program'))}</dt><dd>${esc(t(pf.program))}</dd>
        <dt>GPA</dt><dd>${esc(pf.gpa)}</dd>
        <dt>${esc(ui('kv.location'))}</dt><dd>${esc(pf.location)}</dd>
        <dt>${esc(ui('kv.status'))}</dt><dd>${esc(t(pf.status))}</dd>
      </dl></div>`;
  }
  const panes = { works: worksPane, skills: skillsPane, exp: expPane, about: aboutPane };

  function renderBody(c) {
    $('#pcBody').innerHTML = `<div class="pc-pane">${panes[tab](c)}</div>`;
  }

  function setCategory(i, force) {
    if (i === active && !force) return;
    active = i;
    const c = cats[i];
    $$('button', navList).forEach((b, j) => b.setAttribute('aria-current', j === i));
    if (!desktop.matches && !force) navList.children[i]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    card.innerHTML = `<div class="pc-content">
      <div class="pc-head">
        <div>
          <div class="pc-label">${esc(ui('pc.profile'))} · ${esc(c.label)}</div>
          <div class="pc-id">
            <div class="pc-avatar"><img src="${D.profile.avatar}" alt="${esc(D.profile.name)}"><i class="dot"></i></div>
            <div><div class="pc-name">${esc(D.profile.name)}</div><div class="pc-handle">${esc(D.profile.handle)} · ${esc(c.headline)}</div></div>
          </div>
          <p class="pc-bio">${esc(t(c.bio))}</p>
          <div class="pc-stats">${c.stats.map(([v, l]) => `<div><b>${esc(v)}</b><small>${esc(t(l))}</small></div>`).join('')}</div>
        </div>
        <div>
          <div class="pc-banner" style="background:${c.banner.bg}"><small>~/suphakit/${c.key}</small><b>${esc(c.banner.text)}</b></div>
          <div class="pc-tags"><div class="chips">${c.tags.map((x) => `<span class="chip">${esc(x)}</span>`).join('')}</div><span class="pc-loc">📍 ${esc(D.profile.location)}</span></div>
        </div>
      </div>
      <div class="pc-tabs" role="tablist">${TABS.map((k) => `<button role="tab" type="button" data-tab="${k}" aria-selected="${k === tab}">${esc(ui('pc.tab.' + k))}</button>`).join('')}</div>
      <div class="pc-body" id="pcBody"></div>
    </div>`;
    renderBody(c);
  }
  card.addEventListener('click', (e) => {
    const b = e.target.closest('[data-tab]'); if (!b) return;
    tab = b.dataset.tab;
    $$('[data-tab]', card).forEach((x) => x.setAttribute('aria-selected', x === b));
    renderBody(cats[active]);
  });

  $('#trustAvatars').innerHTML = [D.profile.avatar, ...['thai-law-rag', 'genga-studio', 'crypto-fraud', 'popup-analytics'].map((k) => img(P[k].cover, 'sm'))]
    .map((s) => `<img src="${s}" alt="" loading="lazy">`).join('');

  /* =========================================================
     STICKY NOTES — drop in + drag
     ========================================================= */
  const notePos = [[2, 8, -6], [24, 0, 4], [48, 6, -3], [75, 2, 6], [5, 52, 5], [29, 47, -4], [53, 55, 3], [77, 49, -5]];
  const notesEl = $('#notes');
  function renderNotes() {
    const kept = $$('.note', notesEl).map((n) => n.getAttribute('style'));
    notesEl.innerHTML = D.notes.map((n, i) => {
      const [x, y, r] = notePos[i % notePos.length];
      const style = kept[i] || `--x:${x}%;--y:${y}%;--r:${r}deg;--c:${n.color};--i:${i}`;
      const tag = n.slug ? `<a href="${url(n.slug)}" draggable="false">→ ${esc(P[n.slug].title)}</a>` : `→ ${esc(n.tag)}`;
      return `<div class="note${kept[i] && /--dx/.test(kept[i]) ? ' moved' : ''}" style="${style}">
        <span>${esc(t(n.text))}</span><small>${tag}</small></div>`;
    }).join('');
  }
  let zTop = 10;
  notesEl.addEventListener('pointerdown', (e) => {
    const note = e.target.closest('.note');
    if (!note || !desktop.matches || e.target.closest('a')) return;
    e.preventDefault();
    note.setPointerCapture(e.pointerId);
    note.classList.add('dragging', 'moved');
    note.style.zIndex = ++zTop;
    const sx = e.clientX - (parseFloat(note.style.getPropertyValue('--dx')) || 0);
    const sy = e.clientY - (parseFloat(note.style.getPropertyValue('--dy')) || 0);
    const move = (ev) => {
      note.style.setProperty('--dx', ev.clientX - sx + 'px');
      note.style.setProperty('--dy', ev.clientY - sy + 'px');
    };
    const up = () => {
      note.classList.remove('dragging');
      note.removeEventListener('pointermove', move);
      note.removeEventListener('pointerup', up);
      note.removeEventListener('pointercancel', up);
    };
    note.addEventListener('pointermove', move);
    note.addEventListener('pointerup', up);
    note.addEventListener('pointercancel', up);
  });

  /* =========================================================
     EXPERIENCE
     ========================================================= */
  function renderExperience() {
    $('#expGrid').innerHTML = D.experience.map((e) => `<article class="exp-card ${e.tone} reveal is-in">
        <span class="exp-big" aria-hidden="true">${e.big}</span>
        <span class="kind">[${e.kind}]</span>
        <div><h3>${esc(e.title)}</h3><div class="org">${esc(e.org)}</div><div class="where">${esc(t(e.where))}</div></div>
        <ul>${t(e.points).map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
        <div class="chips">${e.chips.map((c) => `<span class="chip">${esc(c)}</span>`).join('')}</div>
      </article>`).join('');
    $('[data-bind="looking"]').textContent = t(D.profile.looking);
  }

  /* =========================================================
     BENTO
     ========================================================= */
  $('#stackRows').innerHTML = D.skillRows.map((row, i) => {
    const items = row.map((s) => `<span>${esc(s)}</span>`).join('');
    return `<div class="m-row" style="--dur:${32 + i * 6}s">${items}${items}</div>`;
  }).join('');

  function renderBento() {
    $('#orders').innerHTML = PR.map((p) => `<li><a href="${url(p.slug)}">
        <img src="${img(p.cover, 'sm')}" alt="" loading="lazy">
        <div class="o-main"><b>${esc(p.title)}</b><small>${esc(p.stack.join(' · '))}</small></div>
        <div class="o-side">${badge(p.status)}<em>${p.year}</em></div></a></li>`).join('');
    $('#process').innerHTML = D.process.map(([a, b]) => `<li><b>${esc(t(a))}</b><small>${esc(t(b))}</small></li>`).join('');
  }

  /* ---------- mini terminal ---------- */
  const out = $('#termOut');
  const input = $('#termInput');
  const Lk = D.links;
  const cmds = {
    help: () => `${ui('term.help')} <span class="hl">about  skills  experience  projects  contact  neofetch  clear</span>`,
    about: () => esc(t(D.profile.intro)),
    skills: () => D.skillRows.map((r, i) => `<span class="hl">${['AI    ', 'ML    ', 'DATA  ', 'TOOLS '][i]}</span> ${esc(r.join(', '))}`).join('\n'),
    experience: () => D.experience.map((e) => `<span class="hl">[${e.kind}]</span> ${esc(e.title)} · ${esc(e.org)} (${esc(t(e.where))})`).join('\n'),
    projects: () => PR.map((p, i) => `${String(i + 1).padStart(2, '0')}  <a href="${url(p.slug)}">${esc(p.title)}</a>  <span class="${p.status === 'done' ? 'ok' : 'hl'}">${esc(ui('status.' + p.status))}</span>`).join('\n'),
    contact: () => `email   <a href="${Lk.email}">${esc(Lk.emailText)}</a>\ngithub  <a href="${Lk.github}" target="_blank" rel="noopener">${esc(Lk.github.replace('https://', ''))}</a>\nresume  <a href="${Lk.resume}" target="_blank" rel="noopener">resume.pdf</a>`,
    neofetch: () => `<span class="hl">suphakit085</span>@portfolio\n-------------------\n<span class="hl">Name</span>     ${esc(D.profile.name)}\n<span class="hl">Uni</span>      ${esc(D.profile.university)} · Year 4\n<span class="hl">GPA</span>      ${esc(D.profile.gpa)}\n<span class="hl">Focus</span>    AI & Data\n<span class="hl">Status</span>   <span class="ok">${esc(t(D.profile.status))}</span>`,
  };
  function run(raw) {
    const c = raw.trim().toLowerCase();
    if (!c) return;
    if (c === 'clear') { out.innerHTML = ''; return; }
    const res = cmds[c] ? cmds[c]() : ui('term.notfound', { c: esc(c) });
    out.insertAdjacentHTML('beforeend', `<div class="cmd">${esc(c)}</div><div>${res}</div>\n`);
    out.scrollTop = out.scrollHeight;
  }
  $('#termForm').addEventListener('submit', (e) => { e.preventDefault(); run(input.value); input.value = ''; });
  $('#termChips').innerHTML = ['help', 'about', 'projects', 'skills', 'contact', 'neofetch', 'clear']
    .map((c) => `<button type="button" data-cmd="${c}">${c}</button>`).join('');
  $('#termChips').addEventListener('click', (e) => {
    const b = e.target.closest('[data-cmd]'); if (b) run(b.dataset.cmd);
  });
  out.addEventListener('click', () => input.focus({ preventScroll: true }));

  /* ---------- contact ---------- */
  $('#contactActions').innerHTML = `
    <a class="btn btn-light" href="${Lk.email}">✉ ${esc(Lk.emailText)}</a>
    <a class="btn btn-ghost-light" href="${Lk.github}" target="_blank" rel="noopener">GitHub ↗</a>
    <a class="btn btn-ghost-light" href="${Lk.resume}" target="_blank" rel="noopener">Resume (PDF) ↗</a>
    <a class="btn btn-ghost-light" href="${Lk.transcript}" target="_blank" rel="noopener">Transcript (PDF) ↗</a>`;

  /* =========================================================
     Render everything that depends on language
     ========================================================= */
  function render(lang) {
    L = lang;
    $$('[data-bind]').forEach((el) => {
      const v = D.profile[el.dataset.bind];
      if (v != null) el.textContent = t(v);
    });
    document.title = ui('meta.title');
    renderStats();
    renderStory();
    setCategory(active < 0 ? 0 : active, true);
    renderNotes();
    renderExperience();
    renderBento();
    input.placeholder = ui('term.placeholder');
    out.innerHTML = `<div>${ui('term.welcome')}</div>\n`;
    onScroll();
  }

  /* =========================================================
     Reveal on scroll
     ========================================================= */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add(en.target === notesEl ? 'in' : 'is-in');
      io.unobserve(en.target);
    });
  }, { threshold: 0.18 });

  /* =========================================================
     Scroll loop
     ========================================================= */
  const navLinks = $$('.nav-links a');
  const sections = navLinks.map((a) => $(a.getAttribute('href')));
  let ticking = false;
  function onScroll() {
    ticking = false;
    const y = scrollY, vh = innerHeight;

    hero.style.setProperty('--p', clamp(y / (vh * 0.85)).toFixed(3));

    const sr = storyText.getBoundingClientRect();
    const sp = clamp((vh * 0.85 - sr.top) / (sr.height + vh * 0.35));
    const lit = Math.round(sp * words.length);
    words.forEach((w, i) => w.classList.toggle('on', i < lit));

    if (desktop.matches) {
      const tr = track.getBoundingClientRect();
      const span = track.offsetHeight - vh;
      const p = clamp(-tr.top / span);
      bar.style.width = (p * 100).toFixed(1) + '%';
      setCategory(Math.min(cats.length - 1, Math.floor(p * cats.length)));
    }

    let cur = -1;
    sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < vh * 0.4) cur = i; });
    navLinks.forEach((a, i) => a.classList.toggle('is-active', i === cur));
  }

  C.applyStatic(L);
  render(L);
  countUp();
  $$('.reveal').forEach((el) => io.observe(el));
  io.observe(notesEl);
  C.onLang(render);

  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);
  desktop.addEventListener('change', onScroll);
})();
