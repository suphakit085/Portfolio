/* =========================================================
   ข้อมูลโปรไฟล์ + เนื้อหาหน้าแรก — แก้ตรงนี้ได้เลย
   ข้อความแบบ { th, en } = สองภาษา · ส่วนโปรเจกต์อยู่ใน projects.js
   ========================================================= */
(function (root, factory) {
  const v = factory();
  if (typeof module === 'object' && module.exports) module.exports = v;
  else root.PORTFOLIO = v;
})(typeof self !== 'undefined' ? self : this, function () {
  return {
    siteUrl: 'https://suphakit.online',

    profile: {
      name: 'Suphakit Kaeokaemthong',
      handle: '@suphakit085',
      avatar: '/assets/img/portrait.webp',
      role: 'Computer Science Student · AI & Data',
      location: 'Khon Kaen, TH · UTC+7',
      university: 'Khon Kaen University',
      program: { en: 'B.Sc. Computer Science · Year 4', th: 'วท.บ. วิทยาการคอมพิวเตอร์ · ปี 4' },
      gpa: '3.03',
      status: { en: 'Open to co-op & internship', th: 'เปิดรับ Co-op & Internship' },
      intro: {
        en: 'Fourth-year Computer Science student at Khon Kaen University, focused on AI and data — RAG systems that cite their sources, machine-learning models tested on data they have never seen, and dashboards executives can decide from. A business-analysis background helps me pin down the question before I touch the data.',
        th: 'นักศึกษา Computer Science ปี 4 มหาวิทยาลัยขอนแก่น สาย AI และ Data ผมสร้างระบบ RAG ที่อ้างอิงแหล่งที่มาได้ เทรนโมเดล machine learning ที่วัดผลกับข้อมูลที่โมเดลไม่เคยเห็น และทำ dashboard ที่ผู้บริหารใช้ตัดสินใจได้จริง โดยมีพื้นฐาน business analysis ช่วยให้เข้าใจโจทย์ก่อนลงมือกับข้อมูล',
      },
      story: {
        en: 'During my internship as a Data Scientist at NAYOO Corporation I prepared the location data behind a land-price model, and designed a road-distance algorithm so accessibility was measured along real roads instead of straight lines. Since then I have built RAG systems that cite every source, trained models that are scored only on data they have never seen, and taken 300,000 credit records through feature engineering to a working LightGBM app. One rule runs through all of it: every number has to be checkable.',
        th: 'ระหว่างฝึกงานเป็น Data Scientist ที่ NAYOO Corporation ผมเตรียมข้อมูลทำเลให้โมเดลราคาที่ดิน และออกแบบอัลกอริทึมวัดระยะทาง ตามถนนจริง แทนเส้นตรง หลังจากนั้นผมสร้างระบบ RAG ที่อ้างอิงแหล่งที่มาได้ทุกจุด เทรนโมเดลโดยวัดผลกับข้อมูลที่โมเดลไม่เคยเห็นเท่านั้น และทำ feature engineering กับข้อมูลเครดิต 300,000 แถว จนออกมาเป็นแอป LightGBM ที่ใช้งานได้จริง สิ่งที่ผมยึดในทุกโปรเจกต์คือ ตัวเลขทุกตัวต้องตรวจสอบได้',
      },
      trust: { en: '7 projects · all completed', th: '7 โปรเจกต์ · เสร็จสมบูรณ์ทั้งหมด' },
      looking: {
        en: 'A co-op placement in AI, data science or data analysis.',
        th: 'ตำแหน่ง Co-op ด้าน AI, Data Science หรือ Data Analysis',
      },
    },

    links: {
      email: 'mailto:suphakit.kae@kkumail.com',
      emailText: 'suphakit.kae@kkumail.com',
      github: 'https://github.com/suphakit085',
      githubRepos: 'https://github.com/suphakit085?tab=repositories',
      resume: '/resume.pdf',
      transcript: '/transcript.pdf',
    },

    heroStats: [
      { value: 7, label: { en: 'Projects', th: 'โปรเจกต์' } },
      { value: 4, label: { en: 'Study year', th: 'ชั้นปี' } },
      { value: 2027, label: { en: 'Graduating', th: 'จบการศึกษา' } },
      { value: 3.03, label: { en: 'GPA', th: 'GPA' }, decimals: 2 },
    ],

    /* การ์ดลอยใน hero: slug, x%, y%, หมุน, กว้าง, ความลึก parallax, ซ่อนบนมือถือ */
    heroCards: [
      ['thai-law-rag', 3, 13, -6, 220, 18],
      ['popup-analytics', 1, 48, 4, 200, 26, true],
      ['crypto-fraud', 13, 74, -3, 180, 12, true],
      ['nutrilift', 82, 11, 5, 210, 22],
      ['genga-studio', 86, 47, -5, 190, 14, true],
      ['review-sentiment', 72, 75, 4, 200, 24, true],
      ['pos-shabu', 25, 88, 3, 170, 10, true],
      ['portrait', 60, 89, -4, 160, 16, true],
    ],

    /* ---------- Showcase: เลื่อนแล้วการ์ดโปรไฟล์เปลี่ยนหมวด ---------- */
    showcase: [
      {
        key: 'ai', label: 'AI & RAG',
        headline: 'AI Engineer · Retrieval-Augmented Generation',
        bio: {
          en: 'Chatbots that answer from a real knowledge base — and an evaluation that proves whether retrieval actually helps.',
          th: 'สร้างแชตบอตที่ตอบจากฐานความรู้จริง และพิสูจน์ด้วยการวัดผลว่า retrieval ช่วยได้จริงหรือไม่',
        },
        banner: { text: 'GROUNDED AI', bg: 'linear-gradient(135deg,#0b1f3a,#1d4ed8 60%,#60a5fa)' },
        tags: ['RAG', 'Vector Search', 'Tool Calling'],
        stats: [['3,110', { en: 'Sections', th: 'มาตรา' }], ['31,728', { en: 'Judgments', th: 'ฎีกา' }], ['0.96', 'Recall@10'], ['150', { en: 'Test questions', th: 'คำถามทดสอบ' }]],
        works: ['thai-law-rag', 'nutrilift', 'genga-studio'],
        note: {
          title: { en: 'Why must the numbers come from code?', th: 'ทำไมตัวเลขต้องคำนวณด้วยโค้ด?' },
          body: {
            en: 'In NutriLift, BMR, TDEE and macro formulas live in tested Python functions the model calls as tools — so the figures cannot be invented.',
            th: 'ใน NutriLift สูตร BMR, TDEE และ macro อยู่ในฟังก์ชัน Python ที่มี test ครอบ โมเดลแค่เรียกใช้เป็น tool — จึงแต่งตัวเลขเองไม่ได้',
          },
        },
        skills: ['Gemini API', 'pgvector', 'Qdrant', 'BGE-M3', 'Cross-encoder rerank', 'FastAPI', 'pytest'],
      },
      {
        key: 'ml', label: 'Machine Learning',
        headline: 'ML · Classification & NLP',
        bio: {
          en: 'Picking models by the metric that fits the problem, splitting data honestly, and turning models into apps other people can use.',
          th: 'เลือกโมเดลด้วย metric ที่ตรงโจทย์ แบ่ง train/test ไม่ให้ผลดูดีเกินจริง และทำโมเดลออกมาเป็นแอปที่คนอื่นใช้ได้',
        },
        banner: { text: 'MODEL THE SIGNAL', bg: 'linear-gradient(135deg,#3b1d06,#d97706 55%,#fde68a)' },
        tags: ['XGBoost', 'LightGBM', 'TF-IDF'],
        stats: [['0.81', { en: 'F1 (illicit)', th: 'F1 (ธุรกรรมผิดกฎหมาย)' }], ['90.5%', 'Precision'], ['84.1%', 'Accuracy'], ['300K', { en: 'Credit records', th: 'แถวข้อมูลเครดิต' }]],
        works: ['crypto-fraud', 'review-sentiment', 'thai-law-rag'],
        note: {
          title: { en: 'Split by time, not at random', th: 'แบ่งข้อมูลตามเวลา ไม่ใช่สุ่ม' },
          body: {
            en: 'Crypto Fraud trains on time steps 1–34 and tests on 35–49, so it is never scored on a period it has seen. XGBoost caught 794 of 1,083 with only 83 false alarms.',
            th: 'Crypto Fraud เทรนช่วงเวลา 1–34 แล้วทดสอบ 35–49 โมเดลจึงไม่เคยถูกวัดผลกับช่วงที่เคยเห็น — XGBoost จับได้ 794 จาก 1,083 โดยเตือนผิดแค่ 83 ครั้ง',
          },
        },
        skills: ['scikit-learn', 'XGBoost', 'LightGBM', 'SMOTE', 'TF-IDF', 'Streamlit', 'pandas'],
      },
      {
        key: 'data', label: 'Data & BI',
        headline: 'Data Analyst · Dashboards & Geospatial',
        bio: {
          en: 'Defining KPIs clearly, then telling the story in the numbers so executives can decide from one page.',
          th: 'นิยาม KPI ให้ชัด แล้วเล่าเรื่องจากตัวเลขให้ผู้บริหารตัดสินใจได้ในหน้าเดียว',
        },
        banner: { text: 'CLEAR DECISIONS', bg: 'linear-gradient(135deg,#042f2e,#0d9488 55%,#99f6e4)' },
        tags: ['Power BI', 'SQL', 'Geospatial'],
        stats: [['398.74M', { en: 'Total revenue', th: 'รายได้รวม' }], ['73.4%', 'Sell-through'], ['2.93%', 'Conversion'], ['Dijkstra', { en: 'Road distance', th: 'ระยะทางตามถนน' }]],
        works: ['popup-analytics', 'crypto-fraud', 'review-sentiment'],
        note: {
          title: { en: 'More footfall ≠ more sales', th: 'คนเดินเยอะ ≠ ขายได้เยอะ' },
          body: {
            en: 'Popup Analytics found flash events earn the most per day on the lowest traffic, mall kiosks the opposite — and flagged the incomplete final months so they are not read as a decline.',
            th: 'Popup Analytics พบว่างาน flash event ทำรายได้ต่อวันสูงสุดทั้งที่คนน้อยที่สุด ส่วน mall kiosk กลับตรงข้าม — และใส่หมายเหตุเดือนท้ายที่ข้อมูลยังไม่ครบ ไม่ให้ใครเข้าใจผิดว่ายอดตก',
          },
        },
        skills: ['Python', 'pandas', 'SQL', 'Power BI', 'Excel', 'Statistics', 'Road-network graphs'],
      },
      {
        key: 'products', label: 'AI Products',
        headline: 'AI Engineer · Shipping models to users',
        bio: {
          en: 'Taking models out of the notebook and into apps people install and use — with the engineering that keeps them fast and safe.',
          th: 'พาโมเดลออกจาก notebook ไปเป็นแอปที่คนติดตั้งและใช้งานจริง — พร้อมงานวิศวกรรมที่ทำให้เร็วและปลอดภัย',
        },
        banner: { text: 'SHIP THE MODEL', bg: 'linear-gradient(135deg,#2e1065,#7c3aed 55%,#f0abfc)' },
        tags: ['ComfyUI', 'FastAPI', 'Next.js'],
        stats: [['−98%', { en: 'Gallery payload', th: 'ขนาดข้อมูลแกลเลอรี' }], ['~36s', { en: 'Render time', th: 'เวลาเรนเดอร์ต่อภาพ' }], ['12,000', { en: 'Autocomplete tags', th: 'แท็ก autocomplete' }], ['15 GB', { en: 'Models auto-installed', th: 'โมเดลที่ติดตั้งอัตโนมัติ' }]],
        works: ['genga-studio', 'nutrilift', 'thai-law-rag'],
        note: {
          title: { en: '29 MB → 0.69 MB', th: '29 MB → 0.69 MB' },
          body: {
            en: 'Genga Studio’s gallery was sending 29 MB to draw one page of thumbnails. A cached WebP endpoint brought that down to 0.69 MB.',
            th: 'แกลเลอรีของ Genga Studio เคยส่งไฟล์ 29 MB เพื่อวาด thumbnail หน้าเดียว ผมทำ endpoint WebP แบบ cache จนเหลือ 0.69 MB',
          },
        },
        skills: ['ComfyUI', 'FastAPI', 'Next.js 15', 'SQLAlchemy', 'Docker', 'Inno Setup', 'Performance tuning'],
      },
      {
        key: 'ba', label: 'Business Analysis',
        headline: 'Business & System Analysis · the groundwork',
        bio: {
          en: 'Gathering requirements, turning them into UML and ER diagrams, and handing over an API spec the dev team can build from straight away.',
          th: 'เก็บ requirement แปลงเป็น UML และ ER diagram แล้วส่งต่อเป็น API spec ที่ทีมพัฒนาเอาไปทำต่อได้ทันที',
        },
        banner: { text: 'REQUIREMENTS FIRST', bg: 'linear-gradient(135deg,#450a0a,#e11d48 55%,#fecdd3)' },
        tags: ['UML', 'ER Diagram', 'Agile / Scrum'],
        stats: [['5', { en: 'Modules', th: 'โมดูล' }], ['3', { en: 'UML diagram types', th: 'แผนภาพ UML' }], ['REST', 'API spec'], ['Postman', { en: 'Every workflow tested', th: 'ทดสอบทุก workflow' }]],
        works: ['pos-shabu', 'popup-analytics', 'nutrilift'],
        note: {
          title: { en: 'From requirements to API', th: 'จาก requirement ถึง API' },
          body: {
            en: 'POS Shabu started with requirements for 5 modules — ordering, tables, stock, staff, payments — then Use Case, Sequence and Class diagrams, a MySQL + REST API build, and every workflow tested in Postman.',
            th: 'POS Shabu เริ่มจากเก็บ requirement 5 โมดูล — สั่งอาหาร โต๊ะ สต็อก พนักงาน การชำระเงิน — วาด Use Case, Sequence, Class แล้วสร้าง MySQL + REST API และทดสอบทุก workflow ด้วย Postman',
          },
        },
        skills: ['Requirements Analysis', 'User Stories', 'UML', 'ER Diagram', 'UAT', 'Jira', 'Postman'],
      },
    ],

    /* ---------- โน้ตในส่วนสีเข้ม ---------- */
    notes: [
      { text: { en: 'AI making up nutrition numbers?', th: 'AI ตอบตัวเลขโภชนาการมั่ว?' }, slug: 'nutrilift', color: '#c5e5c0' },
      { text: { en: 'Thai has no spaces — keyword search misses everything?', th: 'ภาษาไทยไม่มีเว้นวรรค ค้นด้วย keyword ไม่เจอ?' }, slug: 'thai-law-rag', color: '#a3e0ef' },
      { text: { en: 'A gallery loading 29 MB at a time…', th: 'แกลเลอรีโหลดทีละ 29 MB..' }, slug: 'genga-studio', color: '#eccef3' },
      { text: { en: '94% accuracy — while catching zero fraud?', th: 'Accuracy 94% แต่จับโกงไม่ได้สักรายการ?' }, slug: 'crypto-fraud', color: '#f8da9d' },
      { text: { en: 'AI citing law sections that don’t exist?', th: 'AI อ้างมาตรากฎหมายที่ไม่มีอยู่จริง?' }, slug: 'thai-law-rag', color: '#fad0b5' },
      { text: { en: 'Lots of footfall, so why so few sales?', th: 'คนเดินเยอะ แต่ทำไมยอดขายน้อย?' }, slug: 'popup-analytics', color: '#a5e3d6' },
      { text: { en: 'Ten thousand reviews — who has time to read them?', th: 'รีวิวเป็นหมื่น อ่านไม่ไหว?' }, slug: 'review-sentiment', color: '#fccadc' },
      { text: { en: 'Straight-line distance isn’t the real road distance', th: 'ระยะเส้นตรง ไม่ใช่ระยะทางจริงบนถนน' }, tag: 'NAYOO Internship', color: '#c4ddfb' },
    ],

    /* ---------- ประสบการณ์ ---------- */
    experience: [
      {
        kind: 'INTERNSHIP', big: 'INTERN', tone: 'blue',
        title: 'Data Scientist Intern', org: 'NAYOO Corporation', where: 'Khon Kaen, TH',
        points: {
          en: [
            'Collected and cleaned location data for places across Khon Kaen (shops, hospitals, schools, parks) and grouped them into layers by how much they might affect land prices.',
            'Sorted the road network into local and major roads to prepare features for the land-price model.',
            'Designed an algorithm that measures how far each land parcel is from a major road along the actual roads (Dijkstra’s shortest path), rather than in a straight line.',
          ],
          th: [
            'เก็บและทำความสะอาดข้อมูลสถานที่ทั่วขอนแก่น (ร้านค้า โรงพยาบาล โรงเรียน สวนสาธารณะ) แล้วแบ่งกลุ่มตามระดับผลกระทบต่อราคาที่ดิน',
            'แยกโครงข่ายถนนเป็นถนนสายรองและสายหลัก เพื่อเตรียม feature ให้โมเดลราคาที่ดิน',
            'ออกแบบอัลกอริทึมวัดระยะจากแปลงที่ดินถึงถนนสายหลักตามถนนจริง (Dijkstra) แทนเส้นตรง',
          ],
        },
        chips: ['Python', 'Geospatial', 'Dijkstra', 'Feature Engineering'],
      },
      {
        kind: 'EDUCATION', big: 'B.Sc.', tone: 'yellow',
        title: 'B.Sc. Computer Science', org: 'Khon Kaen University',
        where: { en: '2023 — 2027 (expected)', th: '2023 — 2027 (คาดว่าจบ)' },
        points: {
          en: [
            'Year 4, Faculty of Computer Science · GPA 3.03 · expected graduation 2027.',
            'Relevant coursework: Data Structures, Database Management Systems, Statistics, Data Analytics and Application, Neural Networks and Deep Learning, Software Engineering.',
          ],
          th: [
            'ชั้นปีที่ 4 สาขาวิทยาการคอมพิวเตอร์ · GPA 3.03 · คาดว่าจบปี 2027',
            'วิชาที่เกี่ยวข้อง: Data Structures, Database Management Systems, Statistics, Data Analytics and Application, Neural Networks and Deep Learning, Software Engineering',
          ],
        },
        chips: ['Statistics', 'Data Analytics', 'Deep Learning', 'GPA 3.03'],
      },
    ],

    /* ---------- Skill rows (marquee + terminal) ---------- */
    skillRows: [
      ['RAG', 'LLM evaluation', 'Tool calling', 'Gemini API', 'pgvector', 'Qdrant', 'BGE-M3'],
      ['scikit-learn', 'XGBoost', 'LightGBM', 'NLP / TF-IDF', 'SMOTE', 'Feature engineering', 'Streamlit'],
      ['Python', 'pandas', 'SQL', 'Power BI', 'Excel', 'Statistics', 'Geospatial'],
      ['FastAPI', 'PostgreSQL', 'MySQL', 'Docker', 'Git / GitHub', 'Requirements & UML', 'Jira'],
    ],

    process: [
      [{ en: 'Frame the question', th: 'ตั้งโจทย์ให้ชัด' }, { en: 'Pin down the decision the data or model has to support', th: 'ระบุให้ชัดว่าข้อมูลหรือโมเดลต้องช่วยตัดสินใจเรื่องอะไร' }],
      [{ en: 'Prepare the data', th: 'เตรียมข้อมูล' }, { en: 'Clean, join and engineer features — and split it honestly', th: 'ทำความสะอาด รวมข้อมูล สร้าง feature แล้วแบ่ง train/test ไม่ให้ข้อมูลรั่วข้ามกัน' }],
      [{ en: 'Build', th: 'สร้างโมเดลและระบบ' }, { en: 'Models, RAG pipelines and the apps around them', th: 'ทั้งโมเดล RAG pipeline และแอปที่ให้คนใช้งานจริง' }],
      [{ en: 'Measure', th: 'วัดผลจริง' }, { en: 'Test with the metric that fits the problem, not just “looks good”', th: 'ทดสอบด้วย metric ที่ตรงโจทย์ ไม่ใช่แค่ “ดูดี”' }],
    ],
  };
});
