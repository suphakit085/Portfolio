/* Project detail page — language switching, lightbox, reveal */
(() => {
  const C = window.CORE;
  const ctx = { C, D: window.PORTFOLIO, PR: window.PROJECTS };
  const slug = document.body.dataset.slug;
  const main = document.getElementById('pj');
  const p = ctx.PR.find((x) => x.slug === slug);

  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  const observe = () => main.querySelectorAll('.reveal:not(.is-in)').forEach((el) => io.observe(el));

  function render(lang, first) {
    // the HTML is pre-rendered in English by build.js — only re-render when needed
    if (!(first && lang === 'en')) main.innerHTML = window.renderProject(slug, lang, ctx);
    document.title = `${p.title} — Suphakit Kaeokaemthong`;
    document.querySelectorAll('[data-bind="status"]').forEach((el) => { el.textContent = C.t(ctx.D.profile.status, lang); });
    observe();
  }

  C.applyStatic(C.lang);
  render(C.lang, true);
  C.onLang((l) => render(l));

  /* ---------- lightbox ---------- */
  const box = document.getElementById('lightbox');
  const boxImg = box.querySelector('img');
  const boxCap = box.querySelector('figcaption');
  let shots = [], idx = 0;
  function show(n) {
    idx = (n + shots.length) % shots.length;
    const b = shots[idx];
    boxImg.src = b.dataset.full;
    boxImg.alt = b.dataset.cap;
    boxCap.textContent = b.dataset.cap;
  }
  main.addEventListener('click', (e) => {
    const b = e.target.closest('.pj-zoom'); if (!b) return;
    shots = [...main.querySelectorAll('.pj-zoom')];
    show(shots.indexOf(b));
    box.showModal();
  });
  box.addEventListener('click', (e) => {
    if (e.target.closest('[data-nav]')) show(idx + +e.target.closest('[data-nav]').dataset.nav);
    else if (e.target === box || e.target.closest('[data-close]')) box.close();
  });
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'ArrowLeft') show(idx - 1);
  });
})();
