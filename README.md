# Suphakit Kaeokaemthong — Portfolio

เว็บพอร์ตโฟลิโอสองภาษา (TH/EN) สไตล์ fastwork.com/th/selling — HTML/CSS/JS ล้วน ไม่มี dependency
deploy บน Vercel เป็น static site

## รันในเครื่อง
```
node server.js
```
เปิด http://127.0.0.1:4300/ (server นี้จำลอง Vercel: `/projects/<slug>` และหน้า 404)

## แก้เนื้อหา
| อยากแก้ | ไฟล์ |
|---|---|
| โปรไฟล์ ลิงก์ หมวด showcase โน้ต ประสบการณ์ ทักษะ | `assets/js/data.js` |
| โปรเจกต์ (หน้าแรก + หน้ารายละเอียด) | `assets/js/projects.js` |
| ข้อความ UI ทั้งสองภาษา (ปุ่ม หัวข้อ เมนู) | `assets/js/core.js` → `UI` |
| สไตล์ / สี (design tokens ใน `:root`) | `assets/css/style.css` |

ข้อความแบบ `{ en: '...', th: '...' }` = สองภาษา · ภาษาเริ่มต้นเลือกจาก: `?lang=` → ที่ผู้ใช้เคยเลือก → ภาษาเบราว์เซอร์

**หลังแก้ `projects.js` หรือ `data.js` ให้รัน build ใหม่ทุกครั้ง:**
```
node build.js
```
จะสร้าง `projects/<slug>/index.html`, `404.html`, `sitemap.xml`, `robots.txt` (ห้ามแก้ไฟล์พวกนี้ตรง ๆ)

### เพิ่มโปรเจกต์ใหม่
1. ใส่รูปเป็น WebP ใน `assets/img/projects/` 2 ขนาด: `<ชื่อ>.webp` (กว้าง ≤1600px) และ `<ชื่อ>-sm.webp` (กว้าง 720px)
2. เพิ่ม object ใน `assets/js/projects.js` (copy อันเดิมไปแก้)
3. `node build.js` แล้ว `python scripts/make_og.py` (ภาพแชร์ลิงก์, ต้องมี Pillow)

## ตรวจก่อน deploy
```
node scripts/check.js
```
เช็กว่าหน้าที่ generate เป็นปัจจุบัน ลิงก์/รูปครบ ทุกหน้ามี SEO meta และไม่มี path ในเครื่องหลุดไป — ขั้นตอน deploy เต็ม ๆ อยู่ใน `DEPLOY.md`

## Deploy (Vercel)
1. push โฟลเดอร์นี้ขึ้น GitHub repo
2. Vercel → Add New Project → import repo → Framework Preset: **Other** (ไม่ต้องตั้ง build command)
3. ย้ายโดเมน: project เก่า → Settings → Domains → ลบ `suphakit.online` แล้วไปเพิ่มใน project ใหม่
4. เปิด Analytics: project ใหม่ → Analytics → Enable (สคริปต์ใส่ไว้แล้ว โหลดเฉพาะบนโดเมนจริง)

URL เดิม `/projects/<slug>`, `/resume.pdf`, `/transcript.pdf` ยังใช้ได้เหมือนเดิม

## โครงสร้าง
```
index.html              หน้าแรก
projects/<slug>/        หน้ารายละเอียด (สร้างโดย build.js)
assets/js/core.js       i18n + helper + nav + analytics
assets/js/data.js       ข้อมูลโปรไฟล์
assets/js/projects.js   ข้อมูลโปรเจกต์
assets/js/main.js       หน้าแรก: render + animation
assets/js/project-view.js / project.js   หน้ารายละเอียด
assets/og/              ภาพแชร์ลิงก์ (scripts/make_og.py)
vercel.json             clean URLs, cache, security headers
```
