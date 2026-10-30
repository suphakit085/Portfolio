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
      role: 'Computer Science Student · Software Engineering · Data & Business Analysis',
      location: 'Khon Kaen, TH · UTC+7',
      university: 'Khon Kaen University',
      program: { en: 'B.Sc. Computer Science · Year 4', th: 'วท.บ. วิทยาการคอมพิวเตอร์ · ปี 4' },
      gpa: '3.03',
      status: { en: 'Open to co-op & internship', th: 'เปิดรับ Co-op & Internship' },
      intro: {
        en: 'Hi, I’m Suphakit, a fourth-year Computer Science student at Khon Kaen University. I work where business analysis meets data science — writing requirements and UML on one side, and building with Python, SQL and machine learning on the other.',
        th: 'สวัสดีครับ ผม Suphakit นักศึกษา Computer Science ปี 4 มหาวิทยาลัยขอนแก่น ทำงานตรงจุดที่ business analysis มาเจอ data science — เขียน requirement กับ UML ฝั่งหนึ่ง แล้วลงมือสร้างด้วย Python, SQL และ machine learning อีกฝั่ง',
      },
      story: {
        en: 'During my internship as a Data Scientist at NAYOO Corporation I prepared the location data behind a land-price model, and designed a road-distance algorithm so accessibility was measured along real roads instead of straight lines. I enjoy following a problem from start to finish — writing the requirements and UML for a restaurant POS and then building its database and API, or taking 300,000 credit records through feature engineering to a working app.',
        th: 'ระหว่างฝึกงานเป็น Data Scientist ที่ NAYOO Corporation ผมเตรียมข้อมูลทำเลให้โมเดลราคาที่ดิน และออกแบบอัลกอริทึมวัดระยะทาง ตามถนนจริง แทนเส้นตรง ผมชอบตามโจทย์ ตั้งแต่ต้นจนจบ ตั้งแต่เขียน requirement และ UML ของระบบ POS ไปจนถึงสร้างฐานข้อมูลและ API หรือพาข้อมูลเครดิต 300,000 แถว ผ่าน feature engineering จนเป็นแอปที่ใช้งานได้จริง',
      },
      trust: { en: '7 projects · 3 in progress · 4 completed', th: '7 โปรเจกต์ · 3 กำลังพัฒนา · 4 เสร็จสมบูรณ์' },
      looking: {
        en: 'A co-op placement in data or business analysis, where both sides of my work are useful.',
        th: 'ตำแหน่ง Co-op ด้าน Data หรือ Business Analysis ที่ได้ใช้ทั้งสองฝั่งร่วมกัน',
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
      ['pos-shabu', 72, 75, 4, 200, 24, true],
      ['review-sentiment', 25, 88, 3, 170, 10, true],
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
            th: 'ใน NutriLift สูตร BMR, TDEE และ macro อยู่ในฟังก์ชัน Python ที่มี test ครอบ โมเดลแค่เรียกใช้เป็น tool — ตัวเลขเลยแต่งขึ้นเองไม่ได้',
          },
        },
        skills: ['Gemini API', 'pgvector', 'Qdrant', 'BGE-M3', 'Cross-encoder rerank', 'FastAPI', 'pytest'],
      },
      {
        key: 'fullstack', label: 'Full-stack',
        headline: 'Software Engineer · Web & Desktop',
        bio: {
          en: 'From UI to backend to installer — making the whole system work on the user’s own machine.',
          th: 'ตั้งแต่ UI ไปจนถึง backend และ installer — ทำให้ระบบทั้งก้อนใช้งานได้จริงบนเครื่องผู้ใช้',
        },
        banner: { text: 'SHIP IT', bg: 'linear-gradient(135deg,#2e1065,#7c3aed 55%,#f0abfc)' },
        tags: ['Next.js', 'FastAPI', 'Docker'],
        stats: [['−98%', 'Gallery payload'], ['~36s', 'Render time'], ['5', 'POS modules'], ['15 GB', 'Auto install']],
        works: ['genga-studio', 'pos-shabu', 'nutrilift'],
        note: {
          title: { en: '29 MB → 0.69 MB', th: '29 MB → 0.69 MB' },
          body: {
            en: 'Genga Studio’s gallery was sending 29 MB to draw one page of thumbnails. A cached WebP endpoint brought that down to 0.69 MB.',
            th: 'แกลเลอรีของ Genga Studio เคยส่งไฟล์ 29 MB เพื่อวาด thumbnail หน้าเดียว ผมทำ endpoint WebP แบบ cache จนเหลือ 0.69 MB',
          },
        },
        skills: ['Next.js 15', 'React 19', 'TypeScript', 'Prisma', 'SQLAlchemy', 'Docker', 'Inno Setup'],
      },
      {
        key: 'ml', label: 'Machine Learning',
        headline: 'ML · Classification & NLP',
        bio: {
          en: 'Picking models by the metric that fits the problem, splitting data honestly, and turning models into apps other people can use.',
          th: 'เลือกโมเดลจาก metric ที่ตรงโจทย์ แบ่งข้อมูลอย่างซื่อตรง และแปลงโมเดลเป็นแอปให้คนอื่นใช้ได้',
        },
        banner: { text: 'MODEL THE SIGNAL', bg: 'linear-gradient(135deg,#3b1d06,#d97706 55%,#fde68a)' },
        tags: ['XGBoost', 'LightGBM', 'TF-IDF'],
        stats: [['0.81', 'F1 (illicit)'], ['90.5%', 'Precision'], ['84.1%', 'Accuracy'], ['300K', 'Credit records']],
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
        stats: [['398.74M', 'Total revenue'], ['73.4%', 'Sell-through'], ['2.93%', 'Conversion'], ['Dijkstra', 'Road distance']],
        works: ['popup-analytics', 'crypto-fraud', 'review-sentiment'],
        note: {
          title: { en: 'More footfall ≠ more sales', th: 'คนเดินเยอะ ≠ ขายได้เยอะ' },
          body: {
            en: 'Popup Analytics found flash events earn the most per day on the lowest traffic, mall kiosks the opposite — and flagged the incomplete final months so they are not read as a decline.',
            th: 'Popup Analytics พบว่างาน flash event ทำรายได้ต่อวันสูงสุดทั้งที่คนน้อยที่สุด ส่วน mall kiosk กลับตรงข้าม — และกำกับเดือนท้ายที่ข้อมูลไม่ครบ ไม่ให้ถูกอ่านเป็นยอดตก',
          },
        },
        skills: ['Python', 'pandas', 'SQL', 'Power BI', 'Excel', 'Statistics', 'Road-network graphs'],
      },
      {
        key: 'ba', label: 'Business Analysis',
        headline: 'Business & System Analyst',
        bio: {
          en: 'Gathering requirements, turning them into UML and ER diagrams, and handing over an API spec the dev team can build from straight away.',
          th: 'เก็บ requirement แปลงเป็น UML และ ER diagram แล้วส่งต่อเป็น API spec ที่ทีมพัฒนาเอาไปทำต่อได้ทันที',
        },
        banner: { text: 'REQUIREMENTS FIRST', bg: 'linear-gradient(135deg,#450a0a,#e11d48 55%,#fecdd3)' },
        tags: ['UML', 'ER Diagram', 'Agile / Scrum'],
        stats: [['5', 'Modules'], ['3', 'UML types'], ['REST', 'API spec'], ['UAT', 'Tested']],
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
      { text: { en: 'A gallery loading 29 MB at a time..', th: 'แกลเลอรีโหลดทีละ 29 MB..' }, slug: 'genga-studio', color: '#eccef3' },
      { text: { en: 'Only 1 in 9 transactions is fraud — how do you catch it?', th: 'ธุรกรรมโกงมีแค่ราว 1 ใน 9 จะจับยังไง?' }, slug: 'crypto-fraud', color: '#f8da9d' },
      { text: { en: 'Unclear requirements, so devs build the wrong thing?', th: 'requirement ไม่ชัด dev ทำไม่ถูก?' }, slug: 'pos-shabu', color: '#fad0b5' },
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
            'เก็บและทำความสะอาดข้อมูลสถานที่ทั่วขอนแก่น (ร้านค้า โรงพยาบาล โรงเรียน สวน) แล้วจัดเป็นชั้นตามผลต่อราคาที่ดิน',
            'แยกโครงข่ายถนนเป็นถนนสายรองและสายหลัก เพื่อเตรียม feature ให้โมเดลราคาที่ดิน',
            'ออกแบบอัลกอริทึมวัดระยะจากแปลงที่ดินถึงถนนสายหลักตามถนนจริง (Dijkstra) แทนเส้นตรง',
          ],
        },
        chips: ['Python', 'Geospatial', 'Dijkstra', 'Feature Engineering'],
      },
      {
        kind: 'EDUCATION', big: 'B.Sc.', tone: 'yellow',
        title: 'B.Sc. Computer Science', org: 'Khon Kaen University',
        where: { en: '2023 — 2027 (expected)', th: '2566 — 2570 (คาดว่าจบ)' },
        points: {
          en: [
            'Year 4, Faculty of Computer Science · GPA 3.03 · expected graduation 2027.',
            'Relevant coursework: Data Structures, Database Management Systems, Statistics, Data Analytics and Application, Neural Networks and Deep Learning, Software Engineering.',
          ],
          th: [
            'ชั้นปีที่ 4 คณะวิทยาการคอมพิวเตอร์ · GPA 3.03 · คาดว่าจบปี 2027',
            'วิชาที่เกี่ยวข้อง: Data Structures, Database Management Systems, Statistics, Data Analytics and Application, Neural Networks and Deep Learning, Software Engineering',
          ],
        },
        chips: ['GPA 3.03', 'Year 4', 'Graduating 2027'],
      },
    ],

    /* ---------- Skill rows (marquee + terminal) ---------- */
    skillRows: [
      ['Requirements Analysis', 'Business Process', 'UML', 'ER Diagram', 'Agile / Scrum', 'Jira', 'UAT'],
      ['Python', 'pandas', 'SQL', 'Power BI', 'Excel', 'Statistics'],
      ['LightGBM', 'XGBoost', 'NLP / TF-IDF', 'Geospatial', 'Streamlit', 'RAG'],
      ['MySQL', 'PostgreSQL', 'MongoDB', 'Git / GitHub', 'Postman', 'Docker'],
    ],

    process: [
      [{ en: 'Understand', th: 'เข้าใจโจทย์' }, { en: 'Talk to users, gather requirements and user stories', th: 'คุยกับผู้ใช้ เก็บ requirement และ user story' }],
      [{ en: 'Design', th: 'ออกแบบ' }, { en: 'UML, ER diagrams and an API spec before writing code', th: 'UML, ER diagram และ API spec ก่อนเขียนโค้ด' }],
      [{ en: 'Build', th: 'ลงมือสร้าง' }, { en: 'Python, SQL, Next.js, FastAPI — whatever the job needs', th: 'Python, SQL, Next.js, FastAPI — ตามที่งานต้องการ' }],
      [{ en: 'Measure', th: 'วัดผลจริง' }, { en: 'Test with the metric that fits the problem, not just “looks good”', th: 'ทดสอบด้วย metric ที่ตรงโจทย์ ไม่ใช่แค่ “ดูดี”' }],
    ],
  };
});
