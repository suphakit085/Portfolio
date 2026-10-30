/* =========================================================
   Shared core — i18n dictionary + helpers (browser + Node build)
   ========================================================= */
(function (root, factory) {
  const v = factory();
  if (typeof module === 'object' && module.exports) module.exports = v;
  else root.CORE = v;
})(typeof self !== 'undefined' ? self : this, function () {
  const LANGS = ['en', 'th'];

  /* ข้อความ UI ทั้งหมด · <hand>คำ</hand> = ตัวเขียนมือสีน้ำเงิน · <pill>คำ</pill> = ไฮไลต์สีเหลือง */
  const UI = {
    'meta.title': { en: 'Suphakit Kaeokaemthong · Portfolio', th: 'Suphakit Kaeokaemthong · พอร์ตโฟลิโอ' },
    'meta.desc': {
      en: 'Computer Science student at Khon Kaen University working across software engineering, data science and business analysis. 7 projects in RAG, ML, full-stack and BI.',
      th: 'นักศึกษา Computer Science มหาวิทยาลัยขอนแก่น สาย Software Engineering, Data Science และ Business Analysis — 7 โปรเจกต์ด้าน RAG, ML, Full-stack และ BI',
    },
    'nav.work': { en: 'Work', th: 'ผลงาน' },
    'nav.experience': { en: 'Experience', th: 'ประสบการณ์' },
    'nav.skills': { en: 'Skills', th: 'ทักษะ' },
    'nav.contact': { en: 'Contact', th: 'ติดต่อ' },
    'nav.home': { en: 'Back to home', th: 'กลับหน้าแรก' },
    'nav.lang': { en: 'Switch language', th: 'เปลี่ยนภาษา' },
    'hero.title': {
      en: '<span class="line">Turning messy data</span><span class="line">into <hand>clear</hand> decisions</span>',
      th: '<span class="line">เปลี่ยนข้อมูลยุ่ง ๆ</span><span class="line">ให้เป็นการตัดสินใจที่ <hand>clear</hand></span>',
    },
    'hero.cta': { en: 'See my work', th: 'ดูผลงาน' },
    'hero.cta2': { en: 'Get in touch', th: 'ติดต่อผม' },
    'hero.scroll': { en: 'Scroll', th: 'เลื่อนลง' },
    'story.title': { en: 'In the end, teams still need <pill>people</pill>', th: 'สุดท้ายแล้ว ทีมก็ยังต้องการ <pill>คน</pill>' },
    'work.eyebrow': { en: 'Work · 7 projects', th: 'ผลงาน · 7 โปรเจกต์' },
    'work.github': { en: 'View on GitHub', th: 'ดูบน GitHub' },
    'pain.title': { en: 'So much data, still no decision..', th: 'ข้อมูลเยอะ แต่ตัดสินใจไม่ได้..' },
    'pain.sub': { en: 'These are exactly the problems I like to solve', th: 'โจทย์แบบนี้แหละ ที่ผมชอบแก้' },
    'pain.hint': { en: '✦ Go on, drag the notes around', th: '✦ ลองลากโน้ตเล่นดูได้นะ' },
    'exp.eyebrow': { en: 'Experience & education', th: 'ประสบการณ์ & การศึกษา' },
    'exp.title': { en: 'From the classroom to <hand>real work</hand>', th: 'จากห้องเรียน สู่ <hand>real work</hand>' },
    'exp.sub': {
      en: 'A real internship with real data, and coursework that covers both the business and the technical side.',
      th: 'ฝึกงานจริงกับข้อมูลจริง และเรียนพื้นฐานที่ใช้ได้ทั้งฝั่งธุรกิจและฝั่งเทคนิค',
    },
    'exp.looking': { en: 'Looking for', th: 'กำลังมองหา' },
    'exp.cta': { en: 'Invite me to your team', th: 'ชวนผมร่วมทีม' },
    'skills.eyebrow': { en: 'Skills & how I work', th: 'ทักษะ & วิธีทำงาน' },
    'skills.title': { en: 'Business side and data side —<br />I cover both', th: 'ทั้งฝั่งธุรกิจและฝั่งข้อมูล<br />ผมทำได้ครบ' },
    'skills.stack': { en: 'Tools I use<br /><b>all the time</b>', th: 'เครื่องมือที่ใช้<br /><b>เป็นประจำ</b>' },
    'skills.orders': { en: 'Every project<br /><b>tracked and organised</b>', th: 'ติดตามทุกโปรเจกต์<br /><b>ให้เป็นระบบ</b>' },
    'skills.process': { en: 'Following a problem<br /><b>from start to finish</b>', th: 'ตามโจทย์<br /><b>ตั้งแต่ต้นจนจบ</b>' },
    'skills.fast': { en: 'I usually reply<br /><b>within 24 hours</b>', th: 'ปกติตอบกลับ<br /><b>ภายใน 24 ชั่วโมง</b>' },
    'skills.fastUnit': { en: 'hrs', th: 'ชม.' },
    'skills.fastNote': { en: 'Thailand time (UTC+7)', th: 'เวลาประเทศไทย (UTC+7)' },
    'term.placeholder': { en: 'type help and press Enter', th: 'พิมพ์ help แล้วกด Enter' },
    'term.welcome': { en: 'Welcome 👋 type <span class="hl">help</span> or tap a button below', th: 'ยินดีต้อนรับ 👋 พิมพ์ <span class="hl">help</span> หรือกดปุ่มด้านล่าง' },
    'term.help': { en: 'Available commands:', th: 'คำสั่งที่ใช้ได้:' },
    'term.notfound': { en: 'command not found: {c} — try <span class="hl">help</span>', th: 'ไม่พบคำสั่ง: {c} — ลองพิมพ์ <span class="hl">help</span>' },
    'contact.title': { en: 'Have a role that fits?<br />Let’s talk <hand>anytime</hand>', th: 'มีตำแหน่งที่เหมาะกับผม?<br />มาคุยกันได้ <hand>anytime</hand>' },
    'contact.note': {
      en: 'Email me any time — I usually reply within 24 hours. Or grab my resume and transcript below.',
      th: 'ส่งอีเมลมาได้เลย ปกติผมตอบภายใน 24 ชั่วโมง หรือดาวน์โหลด Resume และ Transcript ด้านล่าง',
    },
    'footer.top': { en: 'Back to top ↑', th: 'กลับขึ้นบน ↑' },
    'status.progress': { en: 'In progress', th: 'กำลังพัฒนา' },
    'status.done': { en: 'Completed', th: 'เสร็จแล้ว' },
    'pc.profile': { en: 'Profile', th: 'โปรไฟล์' },
    'pc.tab.works': { en: 'Work', th: 'ผลงาน' },
    'pc.tab.skills': { en: 'Skills', th: 'ทักษะ' },
    'pc.tab.exp': { en: 'Experience', th: 'ประสบการณ์' },
    'pc.tab.about': { en: 'About', th: 'เกี่ยวกับ' },
    'pc.key': { en: 'Key projects', th: 'โปรเจกต์หลัก' },
    'pc.all': { en: 'View all', th: 'ดูทั้งหมด' },
    'pc.note': { en: 'Notes from real work', th: 'โน้ตจากงานจริง' },
    'kv.name': { en: 'Name', th: 'ชื่อ' },
    'kv.uni': { en: 'University', th: 'มหาวิทยาลัย' },
    'kv.program': { en: 'Program', th: 'หลักสูตร' },
    'kv.location': { en: 'Location', th: 'ที่อยู่' },
    'kv.status': { en: 'Availability', th: 'สถานะ' },
    /* project page */
    'pj.all': { en: 'All projects', th: 'โปรเจกต์ทั้งหมด' },
    'pj.of': { en: 'Project {n} / {total}', th: 'โปรเจกต์ {n} / {total}' },
    'pj.github': { en: 'GitHub', th: 'GitHub' },
    'pj.live': { en: 'Live demo', th: 'ลองใช้งาน' },
    'pj.glance': { en: 'At a glance', th: 'สรุปสั้น ๆ' },
    'pj.status': { en: 'Status', th: 'สถานะ' },
    'pj.year': { en: 'Year', th: 'ปี' },
    'pj.role': { en: 'My part', th: 'ส่วนที่ทำ' },
    'pj.stack': { en: 'Built with', th: 'สร้างด้วย' },
    'pj.source': { en: 'Source', th: 'ซอร์สโค้ด' },
    'pj.shots': { en: 'Screenshots', th: 'ภาพหน้าจอ' },
    'pj.prev': { en: 'Previous', th: 'ก่อนหน้า' },
    'pj.next': { en: 'Next', th: 'ถัดไป' },
    'pj.cta': { en: 'Like what you see?<br />Let’s <hand>talk</hand>', th: 'สนใจงานแบบนี้?<br />มา<hand>คุยกัน</hand>' },
    'pj.close': { en: 'Close', th: 'ปิด' },
    'nf.title': { en: 'This page wandered off', th: 'ไม่พบหน้านี้' },
    'nf.body': { en: 'The link may be old or mistyped. Try the home page instead.', th: 'ลิงก์อาจเก่าหรือพิมพ์ผิด ลองกลับไปที่หน้าแรกดูนะครับ' },
  };

  const isText = (v) => v && typeof v === 'object' && !Array.isArray(v) && ('en' in v || 'th' in v);
  const t = (v, lang) => (isText(v) ? (v[lang] ?? v.en ?? v.th) : v);
  const ui = (key, lang, vars) => {
    let s = t(UI[key], lang) ?? key;
    if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  };
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const SCRIBBLE = '<svg class="scribble" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true"><path d="M3 14 C 40 4, 90 4, 120 10 S 180 16, 197 6"/></svg>';
  /* expand the tiny markup used in UI strings */
  const rich = (s) => String(s)
    .replace(/<hand>(.*?)<\/hand>/g, `<span class="hand">$1${SCRIBBLE}</span>`)
    .replace(/<pill>(.*?)<\/pill>/g, '<span class="hand hand-pill">$1</span>');

  const img = (name, size) => `/assets/img/projects/${name}${size === 'sm' ? '-sm' : ''}.webp`;
  const badge = (status, lang) => `<span class="badge ${status}">${esc(ui('status.' + status, lang))}</span>`;

  return { LANGS, UI, t, ui, esc, rich, img, badge };
});

/* =========================================================
   Browser-only: language state, static text, nav, analytics
   ========================================================= */
if (typeof window !== 'undefined') (function () {
  const C = window.CORE;
  const KEY = 'lang';
  const listeners = [];

  function detect() {
    const q = new URLSearchParams(location.search).get('lang');
    if (C.LANGS.includes(q)) return q;
    try { const s = localStorage.getItem(KEY); if (C.LANGS.includes(s)) return s; } catch (e) { /* private mode */ }
    return (navigator.language || '').toLowerCase().startsWith('th') ? 'th' : 'en';
  }

  C.lang = detect();

  C.onLang = (fn) => listeners.push(fn);

  C.applyStatic = function (lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = C.ui(el.dataset.i18n, lang); });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = C.rich(C.ui(el.dataset.i18nHtml, lang)); });
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':');
        el.setAttribute(attr, C.ui(key, lang));
      });
    });
    document.querySelectorAll('.lang-toggle [data-l]').forEach((s) => s.classList.toggle('on', s.dataset.l === lang));
  };

  C.setLang = function (lang) {
    if (!C.LANGS.includes(lang) || lang === C.lang) return;
    C.lang = lang;
    try { localStorage.setItem(KEY, lang); } catch (e) { /* ignore */ }
    const u = new URL(location.href);
    if (u.searchParams.has('lang')) { u.searchParams.delete('lang'); history.replaceState(null, '', u); }
    C.applyStatic(lang);
    listeners.forEach((fn) => fn(lang));
    if (window.va) window.va('event', { name: 'lang', data: { lang } });
  };

  document.addEventListener('click', (e) => {
    const b = e.target.closest('.lang-toggle');
    if (b) C.setLang(C.lang === 'th' ? 'en' : 'th');
  });

  /* nav morphs into a floating pill after scrolling */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-pill', scrollY > 40);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Vercel Web Analytics — only on the deployed site */
  if (!/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) && location.protocol === 'https:') {
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    const s = document.createElement('script');
    s.defer = true;
    s.src = '/_vercel/insights/script.js';
    document.head.appendChild(s);
  }

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
