/* =========================================================
   โปรเจกต์ทั้งหมด (ใช้ทั้งหน้าแรก และหน้ารายละเอียด /projects/<slug>)
   ข้อความแบบ { th, en } = สองภาษา · รูปอ้างชื่อไฟล์ใน assets/img/projects/ (ไม่ต้องใส่ .webp)
   ========================================================= */
(function (root, factory) {
  const v = factory();
  if (typeof module === 'object' && module.exports) module.exports = v;
  else root.PROJECTS = v;
})(typeof self !== 'undefined' ? self : this, function () {
  return [
    /* ------------------------------------------------------------ */
    {
      slug: 'compliance-copilot',
      title: 'Compliance Copilot',
      year: 2026, status: 'done', color: '#c7d2fe',
      cover: 'cc-chat-answer',
      coverCap: {
        en: 'A verified answer: every citation was checked against the source in code, and the quoted wording is highlighted in the original document.',
        th: 'คำตอบที่ผ่านการตรวจ: ทุกการอ้างอิงถูกโค้ดตรวจเทียบกับต้นฉบับ และไฮไลต์ข้อความที่อ้างไว้ในเอกสารจริง',
      },
      kind: { en: 'RAG · evaluation · governance', th: 'RAG · การวัดผล · governance' },
      role: {
        en: 'End to end — retrieval, citation checks, evaluation, web app and ops',
        th: 'ทำครบวงจร — ระบบค้นหา การตรวจคำอ้างอิง การวัดผล เว็บแอป และการดูแลระบบ',
      },
      github: 'https://github.com/suphakit085/Compliance-Copilot',
      stack: ['FastAPI', 'PostgreSQL', 'pgvector', 'BGE-M3', 'Gemini API', 'Next.js', 'Docker', 'Prometheus'],
      metric: { en: 'Blind Hit@6 92–94% · 0 leaks', th: 'Hit@6 แบบ blind 92–94% · เอกสารลับรั่ว 0' },
      metrics: [
        ['218', { en: 'Eval questions', th: 'คำถามประเมิน' }],
        ['94.1%', { en: 'Hit@6 · blind held-out', th: 'Hit@6 · held-out แบบ blind' }],
        ['0', { en: 'Confidential leaks', th: 'เอกสารลับรั่วไหล' }],
        ['550', { en: 'Automated tests', th: 'เทสต์อัตโนมัติ' }],
      ],
      summary: {
        en: 'A RAG assistant for Thai banking and securities compliance. Every sentence is cited to the exact section of the law, each citation is verified in code against the source text, and when the evidence is weak it refuses to answer.',
        th: 'ผู้ช่วย AI สำหรับทีม Compliance ธนาคารและธุรกิจหลักทรัพย์ ทุกประโยคอ้างอิงถึงระดับมาตรา/ข้อ โค้ดตรวจว่าข้อความที่อ้างมีอยู่ในต้นฉบับจริง และถ้าหลักฐานไม่พอจะไม่ตอบ',
      },
      sections: [
        { h: { en: 'Overview', th: 'ภาพรวม' },
          p: {
            en: 'Compliance teams answer legal questions every day, and "probably right" is not good enough. A generic chatbot invents section numbers, mixes old and new versions of a rule, ignores who may see which document, and leaves no audit trail. The design rule here is simple: no verifiable evidence, no answer. It covers the PDPA, the Anti-Money Laundering Act, the CDD ministerial regulation, and Bank of Thailand and SEC notifications, alongside internal policies.',
            th: 'ทีม Compliance ต้องตอบคำถามกฎหมายทุกวัน และคำตอบที่ "น่าจะถูก" ยังไม่พอ แชตบอตทั่วไปมักแต่งเลขมาตราขึ้นเอง ปนกฎฉบับเก่ากับฉบับใหม่ ไม่สนว่าใครมีสิทธิ์เห็นเอกสารไหน และไม่มีบันทึกให้ตรวจสอบย้อนหลัง ระบบนี้จึงยึดหลักเดียว: ไม่มีหลักฐานที่ตรวจสอบได้ ก็ไม่ตอบ ครอบคลุม PDPA, พ.ร.บ.ป้องกันและปราบปรามการฟอกเงิน, กฎกระทรวง CDD, ประกาศ ธปท. และ ก.ล.ต. รวมถึงนโยบายภายใน',
          } },
        { h: { en: 'What I built', th: 'สิ่งที่ผมสร้าง' },
          items: {
            en: [
              'Verified citations: the model must return a verbatim quote for every citation, and code checks that the quote exists in the cited passage. If none verify, the user sees the source text instead of the answer.',
              'Abstention: if the best reranker score falls below a calibrated threshold, the language model is never called.',
              'Hybrid retrieval: BGE-M3 dense vectors, Thai-segmented BM25 and explicit section lookup, fused and re-ordered by a cross-encoder, with a glossary that maps the words staff use to the words in the law.',
              'Thai legal documents: repairs broken Thai text from government PDFs, parses the มาตรา/ข้อ structure and amendment footnotes, and falls back to OCR for scanned pages.',
              'Time-aware answers: each answer follows the version in force on a chosen date, while older versions stay searchable.',
              'Access control, twice: clearance filters inside the retrieval SQL and PostgreSQL row-level security under a read-only role. A test deletes the SQL filter and confirms nothing leaks.',
              'Privacy and audit: personal data is masked before it reaches the model (Thai ID checksum, card numbers, phones, names), prompt injection is screened, and every exchange goes into a hash-chained audit log that is re-verified hourly.',
              'Policy gap analysis: checks each clause of an internal policy against the law and produces a reviewable worklist with verified quotes.',
            ],
            th: [
              'ตรวจการอ้างอิงด้วยโค้ด: โมเดลต้องส่งข้อความที่ยกมาแบบคำต่อคำทุกครั้งที่อ้างอิง แล้วโค้ดตรวจว่าข้อความนั้นมีอยู่ในต้นฉบับจริง ถ้าไม่ผ่านเลยสักรายการ ผู้ใช้จะเห็นต้นฉบับแทนคำตอบ',
              'ไม่ตอบเมื่อหลักฐานอ่อน: ถ้าคะแนนของ reranker ต่ำกว่าเกณฑ์ที่ปรับเทียบไว้ ระบบจะไม่เรียกโมเดลภาษาเลย',
              'ค้นหาแบบผสม: BGE-M3, BM25 ที่ตัดคำภาษาไทย และการค้นเลขมาตราโดยตรง รวมอันดับแล้วเรียงใหม่ด้วย cross-encoder พร้อมอภิธานศัพท์ที่แปลงคำที่พนักงานใช้ให้ตรงกับถ้อยคำในกฎหมาย',
              'รองรับเอกสารกฎหมายไทย: ซ่อมข้อความไทยที่เพี้ยนจาก PDF ราชการ แยกโครงสร้างมาตรา/ข้อและเชิงอรรถฉบับแก้ไข และใช้ OCR กับหน้าที่เป็นภาพสแกน',
              'ตอบตามช่วงเวลา: คำตอบอิงฉบับที่มีผลบังคับ ณ วันที่เลือก และยังค้นฉบับเก่าได้',
              'คุมสิทธิ์เข้าถึงสองชั้น: กรองสิทธิ์ใน SQL ของการค้นหา และใช้ Row-Level Security ของ PostgreSQL ภายใต้ role แบบอ่านอย่างเดียว มีเทสต์ที่ลบตัวกรองชั้น SQL ทิ้งแล้วยืนยันว่าเอกสารลับไม่รั่ว',
              'ความเป็นส่วนตัวและการตรวจสอบ: ปิดบังข้อมูลส่วนบุคคลก่อนส่งให้โมเดล (เลขบัตรประชาชน เลขบัตร เบอร์โทร ชื่อ) คัดกรอง prompt injection และบันทึกทุกคำถามคำตอบลง audit log แบบ hash chain ที่ตรวจซ้ำทุกชั่วโมง',
              'Gap Analysis นโยบาย: ตรวจนโยบายภายในเทียบกฎหมายทีละข้อ แล้วออกเป็นรายการให้ทีมตรวจทาน พร้อมข้อความอ้างอิงที่ผ่านการตรวจแล้ว',
            ],
          } },
        { h: { en: 'Results', th: 'ผลการวัด' },
          p: {
            en: '218 evaluation questions in three sets, scored with deterministic checks rather than an LLM judge:',
            th: 'คำถามประเมิน 218 ข้อ แบ่งเป็น 3 ชุด ให้คะแนนด้วยเกณฑ์ที่ตรวจได้แน่นอน ไม่ได้ใช้ LLM เป็นกรรมการ:',
          },
          items: {
            en: [
              'Baseline (fixed-size chunks + vector search): Hit@6 of 51.6–57.5%. Splitting documents by legal unit (มาตรา/ข้อ) alone lifted it to 90%.',
              'Held-out set of 21 questions, first blind run: Hit@6 94.1% and correct behaviour 85.7% — it exposed three real defects, which were then fixed.',
              'Extended set of 146 questions, first blind run: Hit@6 92.2% and correct behaviour 94.5%.',
              'Confidential-document leakage was 0 in every set, cited quotes were found verbatim in the source 95.9–98% of the time, and end-to-end answers took 3.5 s at p50 and 8.8 s at p95.',
            ],
            th: [
              'Baseline (ตัดเอกสารตามขนาด + vector search): Hit@6 อยู่ที่ 51.6–57.5% แค่เปลี่ยนมาตัดเอกสารตามหน่วยกฎหมาย (มาตรา/ข้อ) ก็ขึ้นเป็น 90%',
              'ชุด held-out 21 ข้อ รันรอบแรกแบบ blind: Hit@6 94.1% พฤติกรรมถูก 85.7% และเจอบั๊กจริง 3 จุดซึ่งแก้แล้ว',
              'ชุด extended 146 ข้อ รันรอบแรกแบบ blind: Hit@6 92.2% พฤติกรรมถูก 94.5%',
              'เอกสารลับรั่วไหล 0 ในทุกชุด ข้อความที่อ้างตรงกับต้นฉบับแบบคำต่อคำ 95.9–98% และตอบครบทั้งกระบวนการใช้เวลา 3.5 วินาที (p50) / 8.8 วินาที (p95)',
            ],
          } },
        { h: { en: 'What these numbers do not prove', th: 'สิ่งที่ตัวเลขเหล่านี้ยังไม่ได้พิสูจน์' },
          p: {
            en: 'All test questions were written by engineers and none is confirmed by a compliance expert yet; the internal policies are synthetic samples; and the system has not been used by real users or penetration-tested. The repository says so openly and ships the tooling to close that gap.',
            th: 'คำถามทดสอบทั้งหมดเขียนโดยฝั่งผู้พัฒนา ยังไม่มีผู้เชี่ยวชาญด้าน Compliance ยืนยันเฉลย นโยบายภายในเป็นข้อมูลจำลอง และระบบยังไม่เคยใช้กับผู้ใช้จริงหรือผ่านการทดสอบเจาะระบบ ใน repo บอกข้อจำกัดเหล่านี้ไว้ตรง ๆ พร้อมเครื่องมือสำหรับปิดช่องว่างนี้',
          } },
        { h: { en: 'Tools', th: 'เครื่องมือ' },
          p: {
            en: 'Python and FastAPI, PostgreSQL with pgvector, BGE-M3 with a cross-encoder reranker, the Gemini API, Next.js with shadcn/ui, Docker with a production compose file, GitHub Actions running 550 tests on every push, and Prometheus with 12 alert rules about answer trustworthiness.',
            th: 'Python และ FastAPI, PostgreSQL กับ pgvector, BGE-M3 คู่กับ cross-encoder reranker, Gemini API, Next.js กับ shadcn/ui, Docker พร้อม compose สำหรับ production, GitHub Actions ที่รันเทสต์ 550 ตัวทุกครั้งที่ push และ Prometheus พร้อมกฎแจ้งเตือน 12 ข้อที่วัดความน่าเชื่อถือของคำตอบ',
          } },
      ],
      gallery: [
        { src: 'cc-architecture', cap: { en: 'How an answer is made: every stage is a code check, not a prompt — if verification fails, the system refuses instead of guessing.', th: 'เส้นทางของคำตอบ: ทุกขั้นเป็นการตรวจด้วยโค้ด ไม่ใช่แค่ prompt ถ้าตรวจไม่ผ่าน ระบบจะปฏิเสธแทนการเดา' } },
        { src: 'cc-streaming-draft', cap: { en: 'Streaming: real pipeline progress, sources first, then text labelled as an unverified draft until the citations are checked.', th: 'Streaming: แสดงความคืบหน้าจริง ขึ้นแหล่งอ้างอิงก่อน แล้วตามด้วยข้อความที่ติดป้ายว่าเป็นร่างจนกว่าจะตรวจการอ้างอิงเสร็จ' } },
        { src: 'cc-gap-analysis', cap: { en: 'Policy gap analysis: each internal clause checked against the law, with verified quotes.', th: 'Gap Analysis: ตรวจนโยบายภายในทีละข้อเทียบกับกฎหมาย พร้อมข้อความอ้างอิงที่ผ่านการตรวจ' } },
        { src: 'cc-documents', cap: { en: 'Document library: legal-unit chunks, effective dates, and an owner / approver / review-due governance panel.', th: 'คลังเอกสาร: แบ่งตามหน่วยกฎหมาย มีวันมีผลบังคับ และแผงกำกับดูแลที่ระบุเจ้าของ ผู้อนุมัติ และกำหนดทบทวน' } },
        { src: 'cc-evaluation', cap: { en: 'Evaluation dashboard: blind and after-fix results, per category.', th: 'แดชบอร์ดผลการวัด: แยกผลรอบ blind กับหลังแก้ไข และแยกตามหมวด' } },
        { src: 'cc-audit', cap: { en: 'Audit trail: hash-chained, and one click re-verifies the whole chain.', th: 'บันทึกการตรวจสอบ: เชื่อมกันแบบ hash chain กดครั้งเดียวตรวจซ้ำได้ทั้งสาย' } },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      slug: 'nutrilift',
      title: 'NutriLift Chatbot',
      year: 2026, status: 'done', color: '#c5e5c0',
      cover: 'nutrilift-landing',
      coverCap: {
        en: 'The landing page states the promise — nutrition you can trace to a source — with an inline citation and a figure the model was not allowed to invent.',
        th: 'หน้าแรกบอกจุดยืนไว้ชัด: ข้อมูลโภชนาการต้องตรวจย้อนไปถึงแหล่งที่มาได้ โดยโชว์ทั้งการอ้างอิงในข้อความ และตัวเลขที่โมเดลแต่งเองไม่ได้',
      },
      kind: { en: 'Full-stack & evaluation', th: 'Full-stack และการวัดผล' },
      role: { en: 'Full-stack & evaluation', th: 'Full-stack และการวัดผล' },
      github: 'https://github.com/suphakit085/nutrilift',
      live: 'https://nutrilift-azure.vercel.app',
      stack: ['FastAPI', 'Next.js', 'PostgreSQL', 'pgvector', 'Gemini API', 'SQLAlchemy', 'Docker', 'pytest'],
      metric: { en: 'RAG won all 3 metrics · 150 questions', th: 'RAG ชนะทั้ง 3 metric · 150 คำถาม' },
      metrics: [
        ['150', { en: 'Test questions', th: 'คำถามทดสอบ' }],
        ['3 / 3', { en: 'Metrics won by RAG', th: 'metric ที่ RAG ชนะ' }],
        ['356', { en: 'Thai food rows', th: 'รายการอาหารไทย' }],
        ['8', { en: 'Safety rules', th: 'กฎความปลอดภัย' }],
      ],
      summary: {
        en: 'My final-year project: a Thai-language chatbot that answers nutrition questions for people who lift. Answers are grounded in a curated knowledge base, and every number it quotes is calculated by code rather than generated by the language model.',
        th: 'โปรเจกต์จบของผม: แชตบอตภาษาไทยที่ตอบคำถามโภชนาการสำหรับคนเล่นเวท คำตอบอิงจากฐานความรู้ที่คัดมาแล้ว และตัวเลขทุกตัวคำนวณด้วยโค้ด ไม่ได้ให้โมเดลภาษาสร้างขึ้นเอง',
      },
      sections: [
        { h: { en: 'Overview', th: 'ภาพรวม' },
          p: {
            en: 'People who lift ask the same nutrition questions over and over — how much protein, how many calories on a cut, what to eat around training. A general chatbot answers those confidently but with numbers nobody can check. NutriLift answers in Thai from a curated knowledge base, and every figure it quotes is calculated by tested code rather than written by the model.',
            th: 'คนเล่นเวทมักถามคำถามโภชนาการเดิม ๆ ซ้ำไปมา — ต้องกินโปรตีนเท่าไหร่ ช่วงลดไขมันควรกินกี่แคลอรี ก่อนและหลังซ้อมควรกินอะไร แชตบอตทั่วไปตอบได้อย่างมั่นใจ แต่ตัวเลขตรวจสอบไม่ได้ NutriLift ตอบเป็นภาษาไทยจากฐานความรู้ที่คัดมาแล้ว และตัวเลขทุกตัวมาจากโค้ดที่มี test ไม่ได้มาจากโมเดล',
          } },
        { h: { en: 'My part', th: 'ส่วนที่ผมทำ' },
          p: { en: 'This is my final-year project and I built all of it:', th: 'โปรเจกต์จบของผม ทำเองทั้งหมด:' },
          items: {
            en: [
              'A FastAPI backend, a Next.js chat interface, and a PostgreSQL store for the knowledge base.',
              'The nutrition maths — daily energy needs and macro targets — written as Python functions with tests and handed to the model as tools. The model decides when to calculate; it never decides what the number is.',
              'Eight safety rules, six of them decided in code so the model cannot be talked past them.',
              'A test of whether the knowledge base actually helps: the same 150 questions answered with it and without it, then graded by a different model that was not told which was which. Answers grounded in the knowledge base won on every measure.',
            ],
            th: [
              'Backend ด้วย FastAPI, หน้าแชตด้วย Next.js และ PostgreSQL สำหรับเก็บฐานความรู้',
              'สูตรคำนวณโภชนาการ — พลังงานที่ต้องการต่อวันและเป้าหมาย macro — เขียนเป็นฟังก์ชัน Python ที่มี test แล้วส่งให้โมเดลใช้เป็น tool โมเดลตัดสินใจแค่ว่าจะคำนวณเมื่อไหร่ แต่ไม่ได้เป็นผู้กำหนดตัวเลข',
              'กฎความปลอดภัย 8 ข้อ โดย 6 ข้อบังคับใช้ในโค้ด จึงพูดหลอกให้โมเดลข้ามกฎไม่ได้',
              'ทดสอบว่าฐานความรู้ช่วยได้จริงไหม: ให้ตอบ 150 คำถามเดียวกันทั้งแบบมีและไม่มีฐานความรู้ แล้วให้โมเดลอีกตัวเป็นกรรมการให้คะแนน โดยไม่บอกว่าคำตอบไหนมาจากแบบไหน — คำตอบที่อิงฐานความรู้ชนะทุกเกณฑ์',
            ],
          } },
        { h: { en: 'What it does', th: 'ทำอะไรได้บ้าง' },
          items: {
            en: [
              'Answers nutrition questions in Thai with a source behind each claim, and says it does not know when the question falls outside what it has.',
              'Turns height, weight, age and goal into daily calorie and macro targets.',
              'Builds a day of meals from a 356-row Thai food table instead of letting the model name portions.',
              'Logs what was actually eaten and tracks it against those targets.',
              'Asks for consent before storing health data: two separate ticks at sign-up, recorded with a version, so changing the wording re-asks everyone.',
            ],
            th: [
              'ตอบคำถามโภชนาการเป็นภาษาไทย ทุกคำตอบมีแหล่งอ้างอิงกำกับ และบอกตรง ๆ ว่าไม่รู้ เมื่อคำถามอยู่นอกขอบเขตข้อมูล',
              'แปลงส่วนสูง น้ำหนัก อายุ และเป้าหมาย เป็นเป้าแคลอรีและ macro ต่อวัน',
              'จัดเมนูทั้งวันจากตารางอาหารไทย 356 รายการ แทนการให้โมเดลกำหนดปริมาณเอง',
              'บันทึกสิ่งที่กินจริง และเทียบกับเป้าหมายที่ตั้งไว้',
              'ขอความยินยอมก่อนเก็บข้อมูลสุขภาพ: ให้ติ๊กยินยอมแยก 2 ช่องตอนสมัคร และบันทึกเวอร์ชันของข้อความไว้ ถ้าแก้ข้อความเมื่อไหร่ ระบบจะขอความยินยอมจากทุกคนใหม่',
            ],
          } },
        { h: { en: 'Tools', th: 'เครื่องมือ' },
          p: {
            en: 'FastAPI and SQLAlchemy on the backend, Next.js for the chat, PostgreSQL with pgvector for search, the Gemini API for the model, pytest for the calculation tests, and Docker to run the whole thing.',
            th: 'FastAPI และ SQLAlchemy ฝั่ง backend, Next.js สำหรับหน้าแชต, PostgreSQL กับ pgvector สำหรับค้นหา, Gemini API เป็นโมเดล, pytest ทดสอบสูตรคำนวณ และ Docker สำหรับรันทั้งระบบ',
          } },
      ],
      gallery: [
        { src: 'nutrilift-chat', cap: { en: 'A day of meals assembled from the food table, with the sources panel beside it', th: 'เมนูทั้งวันที่จัดจากตารางอาหาร พร้อมแผงแหล่งอ้างอิงด้านข้าง' } },
        { src: 'nutrilift-goals', cap: { en: 'BMR, TDEE and macro targets — computed by code, with the formulas and references shown', th: 'BMR, TDEE และเป้า macro — คำนวณด้วยโค้ด พร้อมแสดงสูตรและแหล่งอ้างอิง' } },
        { src: 'nutrilift-foodlog', cap: { en: 'The food log tracks what was actually eaten against those targets', th: 'บันทึกอาหาร เทียบสิ่งที่กินจริงกับเป้าหมาย' } },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      slug: 'thai-law-rag',
      title: 'Thai Law RAG',
      year: 2026, status: 'done', color: '#c4ddfb',
      cover: 'lawrag-ask',
      kind: { en: 'Retrieval & evaluation', th: 'Retrieval และการวัดผล' },
      role: { en: 'Solo project — retrieval, evaluation pipeline and frontend', th: 'ทำคนเดียว — ระบบค้นหา, pipeline ประเมินคดี และ frontend' },
      stack: ['FastAPI', 'Next.js', 'Qdrant', 'BGE-M3', 'Gemini API', 'SQLite', 'Docker'],
      metric: { en: 'Recall@10 0.96 · 31,728 judgments', th: 'Recall@10 0.96 · 31,728 ฎีกา' },
      metrics: [
        ['3,110', { en: 'Sections', th: 'มาตรา' }],
        ['31,728', { en: 'Judgments', th: 'คำพิพากษาฎีกา' }],
        ['0.96', { en: 'Recall@10 · Civil Code', th: 'Recall@10 · ป.พ.พ.' }],
        ['4', { en: 'Codes indexed', th: 'ประมวลกฎหมาย' }],
      ],
      summary: {
        en: 'A Thai legal research assistant. Ask a question in everyday Thai and get an answer with the sections it relies on, or describe an incident and have the system work out whether it breaks the law and why.',
        th: 'ผู้ช่วยค้นคว้ากฎหมายไทย ถามด้วยภาษาพูดแล้วได้คำตอบพร้อมมาตราที่อ้างอิง หรือเล่าเหตุการณ์แล้วให้ระบบวิเคราะห์ว่าผิดกฎหมายไหม เพราะอะไร',
      },
      sections: [
        { h: { en: 'Overview', th: 'ภาพรวม' },
          p: {
            en: 'Looking up Thai law means knowing which code to open and roughly where the answer lives. Asking a general chatbot instead gets you an answer that sounds right and cites sections that may not exist. This system sits between the two: questions can be asked in everyday language, and every section it quotes is pulled from an indexed copy of the real text rather than written from the model’s memory.',
            th: 'การค้นกฎหมายไทยต้องรู้ว่าจะเปิดประมวลไหน และคำตอบอยู่ราว ๆ ตรงไหน ถ้าไปถามแชตบอตทั่วไปแทน ก็จะได้คำตอบที่ฟังดูถูก แต่อ้างมาตราที่อาจไม่มีอยู่จริง ระบบนี้อยู่ตรงกลางระหว่างสองทางนั้น: ถามด้วยภาษาพูดได้ และทุกมาตราที่อ้างถึงดึงมาจากสำเนาตัวบทจริงที่ทำดัชนีไว้ ไม่ได้มาจากความจำของโมเดล',
          } },
        { h: { en: 'My part', th: 'ส่วนที่ผมทำ' },
          p: { en: 'A solo project — I built all of it:', th: 'ทำคนเดียวทั้งโปรเจกต์:' },
          items: {
            en: [
              'Collected the four codes and the judgments from open datasets, merged the later amendments into the base text, and indexed one section per chunk. Cutting text into fixed-length pieces instead would have dropped whole sections out of the index.',
              'The search itself: two kinds of vector searched together, their rankings merged, then re-ordered by a cross-encoder down to the eight sections that go to the model.',
              'The case evaluation pipeline: break the story into issues, find the sections that apply, go through the elements of each offence one at a time, then decide. The verdict is computed from those answers in code, so it follows from the elements rather than from what the model felt like concluding.',
              'Tuned the search by measuring it. A hand-written question set for the three codes that public benchmarks do not cover was written specifically so the numbers would not come from the civil code alone.',
            ],
            th: [
              'รวบรวมประมวลกฎหมาย 4 ฉบับและคำพิพากษาจาก open dataset รวมฉบับแก้ไขเข้ากับตัวบทหลัก และทำดัชนีแบบ 1 มาตราต่อ 1 chunk — ถ้าตัดข้อความตามความยาวคงที่ จะมีบางมาตราหลุดจากดัชนีไปทั้งมาตรา',
              'ระบบค้นหา: ค้นด้วย vector สองแบบพร้อมกัน (dense และ sparse) รวมอันดับเข้าด้วยกัน แล้วจัดลำดับใหม่ด้วย cross-encoder จนเหลือ 8 มาตราที่ส่งให้โมเดล',
              'Pipeline ประเมินคดี: แยกเรื่องเป็นประเด็น หามาตราที่เกี่ยวข้อง ไล่องค์ประกอบความผิดทีละข้อ แล้วจึงตัดสิน — คำตัดสินคำนวณจากคำตอบเหล่านั้นในโค้ด จึงเป็นไปตามองค์ประกอบ ไม่ใช่ตามที่โมเดลอยากสรุป',
              'จูนระบบค้นหาโดยวัดผลจริง และเขียนชุดคำถามเองสำหรับอีก 3 ประมวลที่ benchmark สาธารณะไม่ครอบคลุม ตัวเลขจึงไม่ได้มาจาก ป.พ.พ. อย่างเดียว',
            ],
          } },
        { h: { en: 'What it does', th: 'ทำอะไรได้บ้าง' },
          items: {
            en: [
              'Answers questions in everyday Thai, with the sections it used shown beside the answer in full.',
              'Marks each citation with the result of its check, and says plainly that the check confirms the section exists and was quoted correctly — not that the interpretation is right.',
              'Takes an incident described in text or uploaded as a PDF or DOCX, and returns a verdict with the elements that led to it.',
              'Lets any section be opened on its own, showing the sections it refers to and the judgments that cite it.',
              'Sends only text extracted on the user’s own machine by default, never the uploaded file, and asks for consent before each run.',
            ],
            th: [
              'ตอบคำถามภาษาพูด พร้อมแสดงมาตราที่ใช้แบบเต็มข้างคำตอบ',
              'กำกับทุกการอ้างอิงด้วยผลการตรวจ และบอกชัดว่าการตรวจยืนยันแค่ว่ามาตรามีจริงและอ้างถูก — ไม่ได้ยืนยันว่าการตีความถูก',
              'รับเรื่องที่พิมพ์เล่าหรืออัปโหลดเป็น PDF/DOCX แล้วให้คำตัดสินพร้อมองค์ประกอบที่นำไปสู่คำตัดสินนั้น',
              'เปิดดูมาตราใดก็ได้แยกหน้า พร้อมมาตราที่อ้างถึงและคำพิพากษาที่อ้างมาตรานั้น',
              'โดยค่าเริ่มต้นจะส่งเฉพาะข้อความที่ดึงออกมาบนเครื่องผู้ใช้ ไม่ส่งตัวไฟล์ และขอความยินยอมก่อนทุกครั้ง',
            ],
          } },
        { h: { en: 'Tools', th: 'เครื่องมือ' },
          p: {
            en: 'FastAPI for the backend and Next.js for the web app, Qdrant as the vector database, BGE-M3 for embeddings with a cross-encoder for re-ranking, the Gemini API for the language model, SQLite for the section registry, and Docker to run the pieces together.',
            th: 'FastAPI ฝั่ง backend และ Next.js ฝั่งเว็บ, Qdrant เป็น vector database, BGE-M3 ทำ embedding คู่กับ cross-encoder สำหรับ re-rank, Gemini API เป็นโมเดลภาษา, SQLite เก็บทะเบียนมาตรา และ Docker รันทุกส่วนเข้าด้วยกัน',
          } },
      ],
      gallery: [
        { src: 'lawrag-evaluate', cap: { en: 'Case evaluation runs through six steps, then reports the verdict with the sections behind it. The verdict is computed from the elements, not written by the model.', th: 'การประเมินคดีไล่ 6 ขั้นตอน แล้วรายงานคำตัดสินพร้อมมาตราที่รองรับ — คำตัดสินคำนวณจากองค์ประกอบ ไม่ได้ให้โมเดลเขียน' } },
        { src: 'lawrag-section', cap: { en: 'Any section opens on its own page with the verbatim text, where it came from, and the judgments that cite it — 277 of them for this one.', th: 'ทุกมาตราเปิดเป็นหน้าของตัวเองได้ พร้อมตัวบทคำต่อคำ ที่มา และคำพิพากษาที่อ้างถึง — มาตรานี้มี 277 ฎีกา' } },
        { src: 'lawrag-laws', cap: { en: 'The four codes in the system: civil and commercial, criminal, and the two procedure codes.', th: 'ประมวลกฎหมาย 4 ฉบับในระบบ: แพ่งและพาณิชย์ อาญา และวิธีพิจารณาความทั้งสองฉบับ' } },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      slug: 'crypto-fraud',
      title: 'Crypto Fraud',
      year: 2026, status: 'done', color: '#f8da9d',
      cover: 'crypto-model-comparison',
      kind: { en: 'Machine learning · team', th: 'Machine learning · งานกลุ่ม' },
      role: { en: 'Modelling and evaluation · team project', th: 'สร้างโมเดลและวัดผล · งานกลุ่ม' },
      github: 'https://github.com/annop07/Block-Chain-BigData/tree/main/crypto-project',
      stack: ['Python', 'pandas', 'scikit-learn', 'XGBoost', 'SMOTE', 'Streamlit'],
      metric: { en: 'F1 0.81 · Precision 90.5%', th: 'F1 0.81 · Precision 90.5%' },
      metrics: [
        ['0.81', { en: 'F1 (illicit)', th: 'F1 (ธุรกรรมผิดกฎหมาย)' }],
        ['90.5%', { en: 'Precision', th: 'Precision' }],
        ['73.3%', { en: 'Recall', th: 'Recall' }],
        ['83', { en: 'False alarms / 15,587', th: 'แจ้งเตือนผิด / 15,587' }],
      ],
      summary: {
        en: 'A model that flags illicit Bitcoin transactions in the Elliptic dataset. It is tested on later time periods than it was trained on, so the score reflects activity the model has never seen.',
        th: 'โมเดลจับธุรกรรม Bitcoin ผิดกฎหมายในชุดข้อมูล Elliptic ทดสอบกับช่วงเวลาที่อยู่หลังช่วงที่ใช้เทรน คะแนนจึงสะท้อนพฤติกรรมที่โมเดลไม่เคยเห็นมาก่อน',
      },
      sections: [
        { h: { en: 'Overview', th: 'ภาพรวม' },
          p: {
            en: 'A group project for a big data course. The Elliptic dataset records Bitcoin transactions as a graph and marks some of them as illicit or legitimate, which makes it a fair test of whether a model can spot criminal activity among ordinary payments.',
            th: 'งานกลุ่มวิชา Big Data ใช้ชุดข้อมูล Elliptic ที่เก็บธุรกรรม Bitcoin เป็นกราฟ และระบุบางรายการว่าผิดหรือถูกกฎหมาย จึงเหมาะใช้ทดสอบว่าโมเดลแยกธุรกรรมผิดกฎหมายออกจากการจ่ายเงินปกติได้หรือไม่',
          } },
        { h: { en: 'My part', th: 'ส่วนที่ผมทำ' },
          items: {
            en: [
              'Split the data by time instead of at random: the model learns from the earlier period and is tested on the later one, so it is never scored on transactions from a period it had already seen. Criminal behaviour changes over time, and a random split would have flattered the result.',
              'Balanced the training data, where only about one transaction in nine was illicit, so the model would not simply learn to call everything legitimate.',
              'Trained three models — Logistic Regression, Random Forest and XGBoost — and compared them over the same test period.',
              'Wired the trained models into the team’s Streamlit app so a transaction can be scored one at a time.',
            ],
            th: [
              'แบ่งข้อมูลตามเวลาแทนการสุ่ม: เทรนด้วยช่วงก่อน ทดสอบด้วยช่วงหลัง โมเดลจึงไม่เคยถูกวัดผลกับช่วงที่เคยเห็น — พฤติกรรมของมิจฉาชีพเปลี่ยนไปตามเวลา ถ้าสุ่มแบ่ง ผลจะดูดีเกินจริง',
              'ปรับสมดุลข้อมูลเทรน ซึ่งมีธุรกรรมผิดกฎหมายเพียงราว 1 ใน 9 เพื่อไม่ให้โมเดลเอาง่ายด้วยการตอบว่า "ปกติ" ทุกรายการ',
              'เทรน 3 โมเดล — Logistic Regression, Random Forest และ XGBoost — แล้วเทียบกันบนช่วงทดสอบเดียวกัน',
              'เชื่อมโมเดลเข้ากับแอป Streamlit ของทีม เพื่อให้คะแนนธุรกรรมได้ทีละรายการ',
            ],
          } },
        { h: { en: 'What the numbers say', th: 'ตัวเลขบอกอะไร' },
          p: {
            en: 'Only about 6% of the test transactions are illicit, so plain accuracy is misleading — a model that flags nothing at all would still be right 94% of the time. What matters is how many real cases it catches and how many false alarms it raises:',
            th: 'ในชุดทดสอบมีธุรกรรมผิดกฎหมายแค่ราว 6% ค่า accuracy ธรรมดาจึงหลอกตา — โมเดลที่ไม่จับอะไรเลยก็ยังถูก 94% สิ่งที่สำคัญคือจับเคสจริงได้กี่เคส และแจ้งเตือนผิดกี่ครั้ง:',
          },
          items: {
            en: [
              'XGBoost caught 794 of the 1,083 illicit transactions while wrongly flagging only 83 of the 15,587 legitimate ones.',
              'Random Forest came out almost identical, so the two are interchangeable here.',
              'Logistic Regression caught a few more — 906 — but raised 3,524 false alarms doing it, which would mean an analyst chasing roughly four dead ends for every real one. It is the clearest reminder that a single number never settles which model is better.',
            ],
            th: [
              'XGBoost จับได้ 794 จาก 1,083 ธุรกรรมผิดกฎหมาย โดยแจ้งเตือนผิดเพียง 83 จาก 15,587 ธุรกรรมปกติ',
              'Random Forest ได้ผลแทบเท่ากัน ใช้แทนกันได้ในงานนี้',
              'Logistic Regression จับได้มากกว่าเล็กน้อย — 906 — แต่แจ้งเตือนผิดถึง 3,524 ครั้ง เท่ากับนักวิเคราะห์ต้องไล่ตามเคสหลอกราว 4 เคสต่อเคสจริง 1 เคส — เป็นตัวอย่างชัดเจนว่าตัวเลขเดียวไม่พอจะตัดสินว่าโมเดลไหนดีกว่า',
            ],
          } },
        { h: { en: 'Tools', th: 'เครื่องมือ' },
          p: {
            en: 'Python with pandas for the data, scikit-learn and XGBoost for the models, imbalanced-learn to balance the training set, and Streamlit for the app the team delivered.',
            th: 'Python กับ pandas จัดการข้อมูล, scikit-learn และ XGBoost สำหรับโมเดล, imbalanced-learn ปรับสมดุลข้อมูลเทรน และ Streamlit สำหรับแอปที่ทีมส่งมอบ',
          } },
      ],
      gallery: [
        { src: 'crypto-cm-xgboost', cap: { en: 'XGBoost on the held-out period: 794 illicit transactions caught, 289 missed, 83 false alarms', th: 'XGBoost บนช่วงทดสอบ: จับได้ 794 พลาด 289 แจ้งเตือนผิด 83' } },
        { src: 'crypto-cm-logreg', cap: { en: 'The same period for the linear baseline: 906 caught, but 3,524 legitimate transactions wrongly flagged', th: 'baseline เชิงเส้นในช่วงเดียวกัน: จับได้ 906 แต่ธุรกรรมปกติถูกแจ้งผิด 3,524 รายการ' } },
        { src: 'crypto-feature-importance', cap: { en: 'The twenty features the model leaned on most when separating illicit transactions from ordinary ones', th: '20 feature ที่โมเดลใช้มากที่สุดในการแยกธุรกรรมผิดกฎหมายออกจากธุรกรรมปกติ' } },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      slug: 'review-sentiment',
      title: 'Review Sentiment',
      year: 2026, status: 'done', color: '#fccadc',
      cover: 'sentiment-analyze',
      coverCap: {
        en: 'A single review scored with its confidence and class probabilities.',
        th: 'รีวิวหนึ่งรายการที่ถูกให้คะแนน พร้อมความมั่นใจและความน่าจะเป็นของแต่ละคลาส',
      },
      kind: { en: 'NLP & data science', th: 'NLP และ data science' },
      role: { en: 'NLP & data science', th: 'NLP และ data science' },
      github: 'https://github.com/suphakit085/Sentiment-Analysis-of-Restaurant-Reviews-using-NLP-and-Machine-Learning',
      stack: ['Python', 'scikit-learn', 'TF-IDF', 'Streamlit'],
      metric: { en: 'Accuracy 84.1% · 4 models', th: 'Accuracy 84.1% · 4 โมเดล' },
      metrics: [
        ['10,000', { en: 'Reviews', th: 'รีวิว' }],
        ['84.1%', { en: 'Accuracy', th: 'Accuracy' }],
        ['4', { en: 'Models compared', th: 'โมเดลที่เปรียบเทียบ' }],
        ['3', { en: 'Classes', th: 'คลาส' }],
      ],
      summary: {
        en: 'A natural-language-processing pipeline that reads 10,000 Yelp restaurant reviews and labels each one as positive, neutral or negative.',
        th: 'NLP pipeline ที่อ่านรีวิวร้านอาหารจาก Yelp 10,000 รีวิว แล้วจัดแต่ละรีวิวเป็นเชิงบวก เป็นกลาง หรือเชิงลบ',
      },
      sections: [
        { h: { en: 'Overview', th: 'ภาพรวม' },
          p: {
            en: 'Restaurants receive far more reviews than anyone can read. This project trains a classifier on 10,000 English Yelp restaurant reviews to label each one positive, neutral or negative, and ships it as a small app for single or batch predictions.',
            th: 'ร้านอาหารได้รีวิวมากเกินกว่าที่ใครจะอ่านไหว โปรเจกต์นี้เทรน classifier บนรีวิวภาษาอังกฤษจาก Yelp 10,000 รีวิว ให้จัดเป็นเชิงบวก เป็นกลาง หรือเชิงลบ แล้วส่งมอบเป็นแอปเล็ก ๆ ที่ทำนายได้ทั้งทีละรีวิวและทีละหลายรีวิว',
          } },
        { h: { en: 'Approach', th: 'วิธีทำ' },
          items: {
            en: [
              'Converted the reviews into TF-IDF features.',
              'Compared Naive Bayes, Logistic Regression, SVM and class-balanced variants, choosing the final model by macro F1 so the smaller neutral class counts as much as the others.',
              'Tuned hyperparameters with cross-validation.',
              'Studied the errors with confusion matrices and per-class F1 to address class imbalance.',
              'Reached 84.1% accuracy on the test set.',
            ],
            th: [
              'แปลงรีวิวเป็น feature แบบ TF-IDF',
              'เปรียบเทียบ Naive Bayes, Logistic Regression, SVM และรุ่นที่ปรับ class-balanced แล้วเลือกโมเดลสุดท้ายด้วย macro F1 เพื่อให้คลาส "เป็นกลาง" ที่มีจำนวนน้อยได้น้ำหนักเท่าคลาสอื่น',
              'จูน hyperparameter ด้วย cross-validation',
              'วิเคราะห์ความผิดพลาดด้วย confusion matrix และ F1 รายคลาส เพื่อรับมือกับข้อมูลไม่สมดุล',
              'ได้ accuracy 84.1% บนชุดทดสอบ',
            ],
          } },
        { h: { en: 'The app', th: 'ตัวแอป' },
          p: {
            en: 'The app has three parts: Analyze scores a single review and shows the probability for each class; Batch scores one review per line and summarises the distribution; Model report carries the training diagnostics — class balance, model comparison, word clouds per class and per-class F1.',
            th: 'แอปมี 3 ส่วน: Analyze ให้คะแนนทีละรีวิวพร้อมความน่าจะเป็นของแต่ละคลาส, Batch ให้คะแนนหลายรีวิวพร้อมกัน (บรรทัดละรีวิว) แล้วสรุปสัดส่วน และ Model report แสดงผลการเทรน — สมดุลคลาส การเทียบโมเดล word cloud รายคลาส และ F1 รายคลาส',
          } },
      ],
      gallery: [
        { src: 'sentiment-batch', cap: { en: 'Batch mode: every line scored, with the distribution summarised', th: 'โหมด Batch: ให้คะแนนทุกบรรทัด พร้อมสรุปสัดส่วนแต่ละคลาส' } },
        { src: 'sentiment-report', cap: { en: 'Class balance of the corpus and accuracy/precision/recall/F1 across the three models', th: 'สมดุลคลาสของข้อมูล และ accuracy/precision/recall/F1 ของทั้งสามโมเดล' } },
        { src: 'sentiment-wordclouds', cap: { en: 'Most frequent lemmas per class, and per-class F1 — neutral is the hard class', th: 'คำที่พบบ่อยที่สุดในแต่ละคลาส และ F1 รายคลาส — คลาส "เป็นกลาง" ทายยากที่สุด' } },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      slug: 'popup-analytics',
      title: 'Popup Analytics',
      year: 2025, status: 'done', color: '#a5e3d6',
      cover: 'popup-dashboard',
      kind: { en: 'Business & data analysis', th: 'Business และ data analysis' },
      role: { en: 'Business & data analysis', th: 'วิเคราะห์ธุรกิจและข้อมูล' },
      github: 'https://github.com/suphakit085/Luxury-Popup-Marketing-Analysis',
      stack: ['Power BI', 'Excel', 'Data Analysis', 'KPI Design'],
      metric: { en: 'Revenue 398.74M · Sell-through 73.4%', th: 'รายได้ 398.74M · Sell-through 73.4%' },
      metrics: [
        ['398.74M', { en: 'Total revenue', th: 'รายได้รวม' }],
        ['73.4%', { en: 'Sell-through', th: 'Sell-through' }],
        ['2.93%', { en: 'Conversion', th: 'Conversion' }],
        ['186.94K', { en: 'Avg revenue / event', th: 'รายได้เฉลี่ย / งาน' }],
      ],
      summary: {
        en: 'An analysis of how luxury cosmetics pop-up stores performed across regions and event formats, presented as a Power BI dashboard for executives.',
        th: 'วิเคราะห์ผลการดำเนินงานของ pop-up store เครื่องสำอางหรู แยกตามภูมิภาคและรูปแบบงาน นำเสนอเป็น Power BI dashboard สำหรับผู้บริหาร',
      },
      sections: [
        { h: { en: 'Overview', th: 'ภาพรวม' },
          p: {
            en: 'Luxury cosmetics brands run short pop-up stores in malls, airports and event venues. The question behind this project was practical: which locations and event formats actually pay off? I analysed sales, footfall, pricing and duration across regions and turned the answers into a Power BI dashboard for executives.',
            th: 'แบรนด์เครื่องสำอางหรูเปิด pop-up store ระยะสั้นในห้าง สนามบิน และสถานที่จัดงาน คำถามของโปรเจกต์นี้ตรงไปตรงมา: ทำเลและรูปแบบงานแบบไหนที่คุ้มจริง ผมวิเคราะห์ยอดขาย จำนวนคนเดิน ราคา และระยะเวลาจัดงานในแต่ละภูมิภาค แล้วสรุปเป็น Power BI dashboard ให้ผู้บริหาร',
          } },
        { h: { en: 'Headline numbers', th: 'ตัวเลขหลัก' },
          items: {
            en: [
              '398.74M total revenue across the events in the dataset, from 4M units sold.',
              '186.94K average revenue per event.',
              '73.37% average sell-through — most stock placed in a pop-up actually sells.',
              '2.93% conversion rate, measured against footfall.',
            ],
            th: [
              'รายได้รวม 398.74M จากทุกงานในชุดข้อมูล ขายได้ 4M ชิ้น',
              'รายได้เฉลี่ย 186.94K ต่องาน',
              'Sell-through เฉลี่ย 73.37% — สินค้าส่วนใหญ่ที่วางใน pop-up ขายออกจริง',
              'Conversion rate 2.93% เทียบกับจำนวนคนเดิน',
            ],
          } },
        { h: { en: 'What I found', th: 'สิ่งที่ค้นพบ' },
          p: {
            en: 'The most useful result was that footfall and revenue do not move together. Ranking event formats by revenue per day against average daily footfall separates them clearly:',
            th: 'ผลที่มีประโยชน์ที่สุดคือ จำนวนคนเดินกับรายได้ไม่ได้ขยับไปด้วยกัน เมื่อเทียบรายได้ต่อวันกับจำนวนคนเดินเฉลี่ยต่อวันของแต่ละรูปแบบงาน จะเห็นความต่างชัดเจน:',
          },
          items: {
            en: [
              'Flash Events earn the most per day (~4.2K) on some of the lowest footfall — short, concentrated events convert best.',
              'Mall Kiosks draw the highest footfall but earn the least per day, so traffic alone is a poor target.',
              'By location type, Art/Design District leads on revenue per day (4.5K) ahead of Luxury Mall (3.7K).',
              'Revenue is spread evenly across regions — Europe leads at 89M, Asia-Pacific trails at 73M — so the opportunity is in format, not geography.',
            ],
            th: [
              'Flash Event ทำรายได้ต่อวันสูงสุด (~4.2K) ทั้งที่คนเดินน้อยที่สุดกลุ่มหนึ่ง — งานสั้นและกระชับเปลี่ยนคนเดินเป็นยอดขายได้ดีที่สุด',
              'Mall Kiosk มีคนเดินมากที่สุด แต่รายได้ต่อวันน้อยที่สุด การไล่ตามจำนวนคนอย่างเดียวจึงไม่ใช่เป้าที่ดี',
              'แยกตามประเภททำเล Art/Design District นำด้วยรายได้ต่อวัน 4.5K ตามด้วย Luxury Mall 3.7K',
              'รายได้กระจายตัวเท่า ๆ กันทุกภูมิภาค — ยุโรปนำที่ 89M เอเชียแปซิฟิกตามหลังที่ 73M — โอกาสจึงอยู่ที่รูปแบบงาน ไม่ใช่ภูมิศาสตร์',
            ],
          } },
        { h: { en: 'Deliverable', th: 'สิ่งที่ส่งมอบ' },
          p: {
            en: 'An executive-ready Power BI dashboard: KPI cards across the top, then brand, region, location-type and event-format breakdowns, plus a monthly revenue trend with a date slicer. The trend page carries a note that the final months are incomplete, so the drop at the end is not read as falling sales.',
            th: 'Power BI dashboard พร้อมนำเสนอผู้บริหาร: การ์ด KPI ด้านบน ตามด้วยกราฟแยกตามแบรนด์ ภูมิภาค ประเภททำเล และรูปแบบงาน พร้อมกราฟแนวโน้มรายได้รายเดือนที่มีตัวกรองวันที่ หน้ากราฟมีหมายเหตุว่าเดือนท้าย ๆ ข้อมูลยังไม่ครบ เพื่อไม่ให้ใครเข้าใจผิดว่ายอดขายตก',
          } },
      ],
      gallery: [
        { src: 'popup-revenue-trend', cap: { en: 'Monthly revenue trend, annotated so incomplete months are not mistaken for a decline', th: 'แนวโน้มรายได้รายเดือน พร้อมหมายเหตุว่าเดือนท้าย ๆ ข้อมูลยังไม่ครบ ไม่ใช่ยอดตก' } },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      slug: 'genga-studio',
      title: 'Genga Studio',
      year: 2026, status: 'done', color: '#eccef3',
      cover: 'genga-landing',
      kind: { en: 'Product · desktop app', th: 'Product · แอปเดสก์ท็อป' },
      role: { en: 'Solo project — product, architecture, build and installer', th: 'ทำคนเดียว — product, สถาปัตยกรรม, พัฒนา และตัวติดตั้ง' },
      stack: ['Next.js 15', 'React 19', 'FastAPI', 'SQLAlchemy', 'ComfyUI', 'PyTorch CUDA', 'Inno Setup'],
      metric: { en: 'Gallery payload −98% · ~36s per image', th: 'Payload แกลเลอรี −98% · ~36 วิ/ภาพ' },
      metrics: [
        ['~36s', { en: 'Render time', th: 'เวลาเรนเดอร์' }],
        ['−98%', { en: 'Gallery payload', th: 'ขนาดข้อมูลแกลเลอรี' }],
        ['4 / 33', { en: 'Auth fixes', th: 'จุดแก้ระบบ auth' }],
        ['15 GB', { en: 'Auto-installed models', th: 'โมเดลที่ติดตั้งอัตโนมัติ' }],
      ],
      summary: {
        en: 'An anime and manga generation studio that renders on the buyer’s own GPU, sold once as a Windows download. No accounts on a server, no per-image fees, no queue.',
        th: 'สตูดิโอสร้างภาพอนิเมะและมังงะที่เรนเดอร์บน GPU ของผู้ซื้อเอง ขายครั้งเดียวเป็นโปรแกรม Windows — ไม่มีบัญชีบนเซิร์ฟเวอร์ ไม่คิดเงินต่อภาพ ไม่ต้องรอคิว',
      },
      sections: [
        { h: { en: 'Overview', th: 'ภาพรวม' },
          p: {
            en: 'Anime image generators are almost all subscription websites: they charge per image, queue your work behind other people’s, and keep the whole pipeline on their servers. The people who most want this — hobbyist artists and doujin creators — often already own a capable graphics card sitting idle. Genga Studio is the other shape: buy it once, install it, and everything renders on your own machine.',
            th: 'เครื่องมือสร้างภาพอนิเมะแทบทั้งหมดเป็นเว็บแบบสมัครสมาชิก: คิดเงินต่อภาพ ให้รอคิวต่อจากคนอื่น และเก็บทั้ง pipeline ไว้บนเซิร์ฟเวอร์ของตัวเอง แต่คนที่อยากใช้มากที่สุด — นักวาดสมัครเล่นและคนทำโดจิน — มักมีการ์ดจอแรง ๆ อยู่แล้วแต่ไม่ได้ใช้ Genga Studio จึงเลือกอีกทาง: ซื้อครั้งเดียว ติดตั้ง แล้วเรนเดอร์ทุกอย่างบนเครื่องตัวเอง',
          } },
        { h: { en: 'My part', th: 'ส่วนที่ผมทำ' },
          p: { en: 'A solo project — I designed and built every part of it:', th: 'ทำคนเดียว — ออกแบบและสร้างทุกส่วนเอง:' },
          items: {
            en: [
              'The interface in Next.js, and a FastAPI service behind it that turns each request into a job for the rendering engine and streams the progress back.',
              'An installer that assumes an empty machine: it brings its own Python and Node, downloads the engine and about 15 GB of models, and resumes where it stopped if interrupted. Nothing touches the rest of the system, so uninstalling is deleting one folder.',
              'Accounts and sign-in kept on the customer’s own machine, then reviewed for security against a running copy rather than on paper.',
              'Performance work on the library, which was sending the browser 29 MB to draw one screen of thumbnails and now sends 0.69 MB.',
            ],
            th: [
              'หน้าจอด้วย Next.js และ service FastAPI ด้านหลังที่แปลงแต่ละคำขอเป็นงานให้ engine เรนเดอร์ แล้ว stream ความคืบหน้ากลับมา',
              'ตัวติดตั้งที่ไม่ต้องมีอะไรในเครื่องมาก่อน: พก Python และ Node มาเอง ดาวน์โหลด engine และโมเดลราว 15 GB และทำต่อจากจุดเดิมได้ถ้าติดตั้งสะดุดกลางทาง ไม่แตะส่วนอื่นของระบบ ถอนการติดตั้งแค่ลบโฟลเดอร์เดียว',
              'ระบบบัญชีและล็อกอินที่อยู่บนเครื่องลูกค้าเอง แล้วตรวจความปลอดภัยกับระบบที่รันอยู่จริง ไม่ใช่แค่บนกระดาษ',
              'ปรับประสิทธิภาพคลังภาพ จากเดิมส่ง 29 MB เพื่อวาด thumbnail หน้าเดียว เหลือ 0.69 MB',
            ],
          } },
        { h: { en: 'What it does', th: 'ทำอะไรได้บ้าง' },
          items: {
            en: [
              'Text to image, with tag autocomplete over 12,000 tags the model was trained on.',
              'Image to image, with one slider deciding how much of the original survives.',
              'Sketch to anime: lineart goes in, a coloured illustration comes out at the proportions of the drawing.',
              'Inpainting: paint over a region and only that part is regenerated.',
              '4× upscale, for images that need to hold up in print.',
              'Manga pages: seven panel layouts with speech bubbles, composed into a finished page.',
              'Character LoRAs that stack, each with its own strength, so the same character stays consistent across modes.',
            ],
            th: [
              'Text to image พร้อม autocomplete แท็กกว่า 12,000 แท็กที่โมเดลเคยเรียนรู้',
              'Image to image มีสไลเดอร์ตัวเดียวกำหนดว่าจะคงภาพเดิมไว้แค่ไหน',
              'Sketch to anime: ใส่ภาพลายเส้น ได้ภาพลงสีในสัดส่วนเดียวกับต้นฉบับ',
              'Inpainting: ระบายทับบริเวณที่ต้องการ แล้วสร้างใหม่เฉพาะส่วนนั้น',
              'Upscale 4 เท่า สำหรับภาพที่ต้องนำไปพิมพ์',
              'หน้ามังงะ: 7 เลย์เอาต์ช่องภาพพร้อมบอลลูนคำพูด ประกอบเป็นหน้าสำเร็จ',
              'Character LoRA ซ้อนกันได้ ปรับน้ำหนักแยกแต่ละตัว ตัวละครจึงหน้าตาคงเดิมทุกโหมด',
            ],
          } },
        { h: { en: 'Tools', th: 'เครื่องมือ' },
          p: {
            en: 'Next.js 15 and React 19 for the interface, FastAPI with SQLAlchemy for the service behind it, ComfyUI as the rendering engine, PyTorch on CUDA for the GPU work, and Inno Setup with PowerShell for the Windows installer.',
            th: 'Next.js 15 และ React 19 สำหรับหน้าจอ, FastAPI กับ SQLAlchemy เป็น service ด้านหลัง, ComfyUI เป็น engine เรนเดอร์, PyTorch บน CUDA สำหรับงาน GPU และ Inno Setup กับ PowerShell สำหรับตัวติดตั้ง Windows',
          } },
      ],
      gallery: [
        { src: 'genga-workspace', cap: { en: 'The image workspace: prompt, model, aspect, style presets, and the seed kept with the result so it can be reproduced', th: 'พื้นที่ทำงาน: prompt, โมเดล, สัดส่วนภาพ, สไตล์ และ seed ที่เก็บไว้กับผลลัพธ์เพื่อสร้างซ้ำได้' } },
        { src: 'genga-library', cap: { en: 'Every render is kept here, grouped by day and searchable by prompt or seed', th: 'ทุกภาพที่เรนเดอร์เก็บไว้ที่นี่ จัดกลุ่มตามวัน ค้นด้วย prompt หรือ seed ได้' } },
        { src: 'genga-manga-page', cap: { en: 'Four panels and a composed page in under two minutes, each panel rendered at the shape of the slot it fills', th: '4 ช่องภาพและหน้ามังงะสำเร็จในไม่ถึง 2 นาที แต่ละช่องเรนเดอร์ตามรูปทรงของช่องนั้น' } },
        { src: 'genga-sketch-before-after', cap: { en: 'Sketch to anime: the same lines on both sides, at the proportions of the drawing that went in', th: 'Sketch to anime: ลายเส้นเดียวกันทั้งสองฝั่ง ในสัดส่วนของภาพต้นฉบับ' } },
        { src: 'genga-inpaint-before-after', cap: { en: 'Inpainting repaints only what was masked — here the jacket changes while the face, hair and background are left alone', th: 'Inpainting วาดใหม่เฉพาะส่วนที่ระบาย — เสื้อแจ็กเก็ตเปลี่ยน แต่หน้า ผม และพื้นหลังเหมือนเดิม' } },
        { src: 'genga-auth', cap: { en: 'Accounts live on the customer’s own machine — there is no account server behind this', th: 'บัญชีผู้ใช้อยู่บนเครื่องลูกค้าเอง — ไม่มีเซิร์ฟเวอร์บัญชีอยู่เบื้องหลัง' } },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      slug: 'pos-shabu',
      title: 'POS Shabu',
      year: 2025, status: 'done', color: '#fad0b5',
      cover: 'pos-shabu',
      kind: { en: 'System analysis & backend', th: 'System analysis และ backend' },
      role: { en: 'System analysis & backend', th: 'วิเคราะห์ระบบและพัฒนา backend' },
      github: 'https://github.com/suphakit085/pos-hana',
      stack: ['Next.js', 'TypeScript', 'Prisma', 'MySQL', 'REST API', 'UML', 'Postman'],
      metric: { en: '5 modules · 3 UML types', th: '5 โมดูล · UML 3 แบบ' },
      metrics: [
        ['5', { en: 'Modules', th: 'โมดูล' }],
        ['3 types', { en: 'UML diagrams', th: 'แผนภาพ UML' }],
        ['MySQL', { en: 'Database', th: 'ฐานข้อมูล' }],
        ['REST', { en: 'API spec', th: 'API spec' }],
      ],
      summary: {
        en: 'A point-of-sale and management system for a shabu restaurant: in-store sales, table reservations and QR-code ordering. I did the system analysis and built the backend.',
        th: 'ระบบ POS และบริหารร้านชาบู: ขายหน้าร้าน จองโต๊ะ และสั่งอาหารผ่าน QR code — ผมทำ system analysis และสร้าง backend',
      },
      sections: [
        { h: { en: 'Overview', th: 'ภาพรวม' },
          p: {
            en: 'A shabu restaurant needs one system that runs the whole shift: customers order from a QR code at their table, staff manage reservations and table status, the kitchen sees orders as they come in, and the cashier settles the bill and prints a receipt. This project built that system end to end as a Next.js web application on a MySQL database.',
            th: 'ร้านชาบูต้องการระบบเดียวที่รองรับงานทั้งกะ: ลูกค้าสั่งอาหารผ่าน QR ที่โต๊ะ พนักงานจัดการการจองและสถานะโต๊ะ ครัวเห็นออเดอร์ทันทีที่เข้ามา และแคชเชียร์เก็บเงินพร้อมพิมพ์ใบเสร็จ โปรเจกต์นี้สร้างระบบนั้นครบวงจรเป็นเว็บแอป Next.js บนฐานข้อมูล MySQL',
          } },
        { h: { en: 'My part', th: 'ส่วนที่ผมทำ' },
          p: { en: 'I was responsible for the system analysis and the backend:', th: 'ผมรับผิดชอบการวิเคราะห์ระบบและ backend:' },
          items: {
            en: [
              'Gathered and documented the functional requirements for ordering, table management, inventory, staff management and payments.',
              'Modelled the system with Use Case, Sequence and Class diagrams.',
              'Turned the models into a MySQL database design and a REST API specification, then implemented the API in Next.js.',
              'Tested every workflow in Postman against the documented requirements.',
            ],
            th: [
              'เก็บและเขียนเอกสาร functional requirement ของการสั่งอาหาร การจัดการโต๊ะ สต็อก พนักงาน และการชำระเงิน',
              'ออกแบบระบบด้วย Use Case, Sequence และ Class diagram',
              'นำ diagram มาออกแบบฐานข้อมูล MySQL และเขียน REST API spec แล้วพัฒนา API ด้วย Next.js',
              'ทดสอบทุก workflow ด้วย Postman เทียบกับ requirement ที่เขียนไว้',
            ],
          } },
        { h: { en: 'What the system does', th: 'ระบบทำอะไรได้บ้าง' },
          items: {
            en: [
              'Customer side: log in, browse the menu and order from a QR code, with ingredient customisation.',
              'Reservations with table-status tracking.',
              'Staff dashboard for the kitchen, reservations and tables.',
              'Inventory and stock management with import/export.',
              'Payment and receipt generation.',
              'Admin screens for employee management.',
            ],
            th: [
              'ฝั่งลูกค้า: ล็อกอิน ดูเมนู และสั่งผ่าน QR code พร้อมเลือกปรับวัตถุดิบ',
              'ระบบจองโต๊ะพร้อมติดตามสถานะโต๊ะ',
              'Dashboard พนักงานสำหรับครัว การจอง และโต๊ะ',
              'จัดการวัตถุดิบและสต็อก นำเข้า/ส่งออกได้',
              'ชำระเงินและออกใบเสร็จ',
              'หน้าจอแอดมินสำหรับจัดการพนักงาน',
            ],
          } },
        { h: { en: 'Tools', th: 'เครื่องมือ' },
          p: {
            en: 'Next.js and TypeScript for the app, Prisma ORM on MySQL for data, Tailwind CSS for the interface, and Postman for API testing.',
            th: 'Next.js และ TypeScript สำหรับแอป, Prisma ORM บน MySQL สำหรับข้อมูล, Tailwind CSS สำหรับหน้าจอ และ Postman สำหรับทดสอบ API',
          } },
      ],
      gallery: [
        { src: 'pos-shabu-qr-code', cap: { en: 'Each table gets its own ordering QR code', th: 'แต่ละโต๊ะมี QR code สำหรับสั่งอาหารของตัวเอง' } },
        { src: 'pos-shabu-qr-order', cap: { en: 'Customers scan and order from the menu', th: 'ลูกค้าสแกนแล้วสั่งจากเมนู' } },
        { src: 'pos-shabu-tables', cap: { en: 'Table management and status', th: 'การจัดการโต๊ะและสถานะ' } },
        { src: 'pos-shabu-kitchen', cap: { en: 'Kitchen order queue', th: 'คิวออเดอร์ของครัว' } },
        { src: 'pos-shabu-stock', cap: { en: 'Inventory and stock', th: 'วัตถุดิบและสต็อก' } },
        { src: 'pos-shabu-payment', cap: { en: 'Payment and receipt', th: 'ชำระเงินและใบเสร็จ' } },
      ],
    },

  ];
});
