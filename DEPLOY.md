# Deploy Checklist: suphakit.online — Portfolio v2 (AI & Data)

**วันที่:** 2026-10-31 · **ผู้ deploy:** Suphakit · **แบบ:** static site บน Vercel แทน project เดิมที่ใช้โดเมน `suphakit.online`

ไม่มี database, ไม่มี build บน Vercel, ไม่มี secret — ความเสี่ยงหลักคือ ลิงก์เสีย, URL เดิมหาย และช่วงสลับโดเมน

---

## Pre-Deploy

ตรวจอัตโนมัติแล้ว (รันซ้ำได้ด้วย `node scripts/check.js`):
- [x] หน้าที่ generate (`projects/*`, `404.html`) ตรงกับข้อมูลล่าสุด
- [x] ลิงก์และไฟล์ภายในทั้งหมดมีอยู่จริง (93 รายการ)
- [x] ทุกหน้ามี title, description, canonical, og:image, JSON-LD ที่ถูกต้อง
- [x] ไม่มี `localhost` หรือ path ในเครื่องหลุดไปในไฟล์ที่ deploy
- [x] `vercel.json` ถูกต้อง
- [x] URL เดิมทั้ง 8 หน้าใน sitemap ของเว็บเก่ายังเปิดได้ (`/`, `/projects/<slug>` × 7)
- [x] URL ไฟล์เดิม redirect ไปที่ใหม่: `/portrait.jpg` (og:image เก่าที่โซเชียล cache ไว้), `/favicon.svg`, `/projects/*.png|jpg|webp`
- [x] `/resume.pdf`, `/transcript.pdf` อยู่ที่ path เดิม
- [x] ลิงก์ภายนอก (GitHub ×7, NutriLift demo) ตอบ 200 ทั้งหมด
- [x] ทดสอบในเบราว์เซอร์: จอคอม + มือถือ, ไทย + อังกฤษ, หน้าโปรเจกต์, lightbox, 404

ต้องตรวจเอง:
- [ ] อ่านทวนคำแปลภาษาไทยในหน้าโปรเจกต์ (`assets/js/projects.js`)
- [ ] `resume.pdf` / `transcript.pdf` เป็นเวอร์ชันล่าสุด (ตอนนี้เป็นไฟล์ที่ copy มาจากเว็บเก่า)
- [ ] ทุกอย่าง commit แล้ว (`git status` ว่าง)

## Deploy

1. **Push ขึ้น GitHub** — สร้าง repo ว่าง (ไม่ต้องติ๊ก README) แล้ว
   ```
   git remote add origin https://github.com/suphakit085/<ชื่อ-repo>.git
   git push -u origin main
   ```
2. **สร้าง project ใหม่บน Vercel** — Add New → Project → import repo
   - Framework Preset: **Other** · Build Command: เว้นว่าง · Output Directory: เว้นว่าง
   - กด Deploy → จะได้ URL `<project>.vercel.app` = ใช้เป็น **staging**
3. **Smoke test บน `*.vercel.app`** (ก่อนแตะโดเมน)
   - [ ] หน้าแรกโหลด, สลับ TH/EN ได้, เลื่อนแล้วการ์ดโปรไฟล์เปลี่ยนหมวด
   - [ ] เปิด `/projects/nutrilift` และอีก 1 หน้า, กดรูปแล้ว lightbox เปิด, ปุ่มก่อนหน้า/ถัดไปใช้ได้
   - [ ] `/projects/xyz` แสดงหน้า 404 สวย ๆ
   - [ ] `/portrait.jpg` และ `/projects/nutrilift-landing.png` redirect แล้วขึ้นรูป
   - [ ] `/resume.pdf` เปิดได้
   - [ ] เปิดบนมือถือจริง 1 เครื่อง
   - [ ] DevTools → Console ไม่มี error สีแดง
4. **สลับโดเมน** (ทำต่อกันทันที เว็บจะหายไปแค่ไม่กี่วินาทีถึง 1–2 นาที)
   - project **เก่า** → Settings → Domains → Remove `suphakit.online` (และ `www.suphakit.online` ถ้ามี)
   - project **ใหม่** → Settings → Domains → Add `suphakit.online` + `www.suphakit.online` (**เอาติ๊ก** "Redirect apex domains to www" **ออก**) แล้ว Edit `www` → Redirect to Another Domain → `suphakit.online` · 308
   - DNS ชี้ Vercel อยู่แล้ว ไม่ต้องแก้ DNS · SSL ออกให้อัตโนมัติ
5. **ตรวจบนโดเมนจริง** — ทำ smoke test ข้อ 3 ซ้ำบน `https://suphakit.online`

## Post-Deploy

- [ ] ล้าง cache ภาพแชร์ลิงก์: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) และ [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) → ใส่ `https://suphakit.online/` แล้วกด scrape ใหม่
- [ ] Google Search Console → Sitemaps → ส่ง `https://suphakit.online/sitemap.xml` และ Request indexing หน้าแรก
- [ ] ติด tag เวอร์ชัน: `git tag v2.0 && git push --tags`
- [ ] **เก็บ project เก่าไว้อย่างน้อย 2 สัปดาห์** (ห้ามลบ) เผื่อ rollback แล้วค่อย archive

## Rollback Triggers

ย้อนกลับทันทีถ้าเจออย่างใดอย่างหนึ่งหลังสลับโดเมน:
- หน้าแรกหรือหน้า `/projects/*` ไม่ขึ้น, ขาว หรือได้ 404
- สลับภาษาไม่ได้ / มี JavaScript error ทำให้เนื้อหาไม่แสดง
- `/resume.pdf` เปิดไม่ได้
- โดเมนขึ้น SSL error นานเกิน 10 นาที

## Rollback Plan

| สถานการณ์ | วิธี | เวลา |
|---|---|---|
| deploy ใหม่ที่ push ทีหลังมีปัญหา | project ใหม่ → Deployments → เลือก deployment ก่อนหน้า → **Instant Rollback** | ไม่ถึง 1 นาที |
| อยากกลับไปใช้เว็บเก่าทั้งหมด | Remove โดเมนจาก project ใหม่ → Add กลับใน project เก่า (project เก่ายังอยู่ครบ) | 1–2 นาที |
