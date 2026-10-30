/* =========================================================
   Project detail page renderer — shared by build.js (static HTML)
   and project.js (re-render when the language changes)
   ========================================================= */
(function (root, factory) {
  const v = factory();
  if (typeof module === 'object' && module.exports) module.exports = v;
  else root.renderProject = v;
})(typeof self !== 'undefined' ? self : this, function () {
  return function renderProject(slug, lang, { C, D, PR }) {
    const { esc, img, rich } = C;
    const t = (v) => C.t(v, lang);
    const ui = (k, vars) => C.ui(k, lang, vars);
    const i = PR.findIndex((p) => p.slug === slug);
    const p = PR[i];
    const prev = PR[(i - 1 + PR.length) % PR.length];
    const next = PR[(i + 1) % PR.length];
    const ext = (href, label) => `<a class="btn btn-line" href="${href}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;
    const floats = p.gallery.slice(0, 2);

    const sections = p.sections.map((s) => `
      <section class="pj-sec reveal">
        <h2>${esc(t(s.h))}</h2>
        ${s.p ? `<p>${esc(t(s.p))}</p>` : ''}
        ${s.items ? `<ul class="checks">${t(s.items).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      </section>`).join('');

    const gallery = p.gallery.map((g, n) => `
      <figure class="pj-shot reveal" style="--i:${n}">
        <button type="button" class="pj-zoom" data-full="${img(g.src)}" data-cap="${esc(t(g.cap))}" aria-label="${esc(t(g.cap))}">
          <img src="${img(g.src, 'sm')}" alt="${esc(t(g.cap))}" loading="lazy">
        </button>
        <figcaption>${esc(t(g.cap))}</figcaption>
      </figure>`).join('');

    const pager = [[prev, 'pj.prev', '←'], [next, 'pj.next', '→']].map(([q, k, arrow]) => `
      <a class="pj-pg ${k === 'pj.next' ? 'is-next' : ''}" href="/projects/${q.slug}">
        <img src="${img(q.cover, 'sm')}" alt="" loading="lazy">
        <span><small>${k === 'pj.prev' ? arrow + ' ' : ''}${esc(ui(k))}${k === 'pj.next' ? ' ' + arrow : ''}</small><b>${esc(q.title)}</b></span>
      </a>`).join('');

    return `
    <section class="pj-hero">
      <div class="pj-hero-copy">
        <a class="pj-back" href="/#work">← ${esc(ui('pj.all'))}</a>
        <div class="pj-meta">${C.badge(p.status, lang)}<span>${p.year}</span><span>·</span><span>${esc(t(p.kind))}</span><span class="muted">${esc(ui('pj.of', { n: i + 1, total: PR.length }))}</span></div>
        <h1 class="pj-title">${esc(p.title)}</h1>
        <p class="pj-summary">${esc(t(p.summary))}</p>
        <div class="pj-actions">
          ${p.live ? `<a class="btn btn-dark" href="${p.live}" target="_blank" rel="noopener">${esc(ui('pj.live'))} ↗</a>` : ''}
          ${p.github ? ext(p.github, ui('pj.github')) : ''}
        </div>
      </div>
      <figure class="pj-cover" style="--c:${p.color}">
        <div class="pj-cover-frame"><img src="${img(p.cover)}" alt="${esc(p.title)}" fetchpriority="high"></div>
        ${floats.map((g, n) => `<div class="pj-float f${n}" aria-hidden="true"><img src="${img(g.src, 'sm')}" alt=""></div>`).join('')}
        ${p.coverCap ? `<figcaption>${esc(t(p.coverCap))}</figcaption>` : ''}
      </figure>
      <div class="stat-chips pj-stats">${p.metrics.map(([v, l]) => `<div class="stat-chip"><b>${esc(v)}</b><small>${esc(t(l))}</small></div>`).join('')}</div>
    </section>

    <div class="pj-body">
      <article class="pj-article">${sections}</article>
      <aside class="pj-glance reveal">
        <h3>${esc(ui('pj.glance'))}</h3>
        <dl class="kv">
          <dt>${esc(ui('pj.status'))}</dt><dd>${C.badge(p.status, lang)}</dd>
          <dt>${esc(ui('pj.year'))}</dt><dd>${p.year}</dd>
          <dt>${esc(ui('pj.role'))}</dt><dd>${esc(t(p.role))}</dd>
        </dl>
        <div class="glance-metrics">${p.metrics.slice(0, 3).map(([v, l]) => `<div><b>${esc(v)}</b><small>${esc(t(l))}</small></div>`).join('')}</div>
        <h4>${esc(ui('pj.stack'))}</h4>
        <div class="chips">${p.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div>
        ${p.github ? `<h4>${esc(ui('pj.source'))}</h4><a class="src" href="${p.github}" target="_blank" rel="noopener">${esc(p.github.replace('https://', ''))} ↗</a>` : ''}
      </aside>
    </div>

    <section class="pj-gallery" aria-labelledby="shots-title">
      <h2 id="shots-title">${esc(ui('pj.shots'))} <small>${p.gallery.length}</small></h2>
      <div class="pj-shots">${gallery}</div>
    </section>

    <nav class="pj-pager" aria-label="${esc(ui('pj.all'))}">${pager}</nav>

    <section class="contact" id="contact">
      <div class="contact-card is-compact">
        <div class="contact-glow" aria-hidden="true"></div>
        <h2>${rich(ui('pj.cta'))}</h2>
        <div class="contact-actions">
          <a class="btn btn-light" href="${D.links.email}">✉ ${esc(D.links.emailText)}</a>
          <a class="btn btn-ghost-light" href="${D.links.resume}" target="_blank" rel="noopener">Resume (PDF) ↗</a>
          <a class="btn btn-ghost-light" href="/#work">← ${esc(ui('pj.all'))}</a>
        </div>
      </div>
    </section>`;
  };
});
