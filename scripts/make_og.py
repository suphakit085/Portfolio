"""Generate Open Graph share images (1200x630) into assets/og/.

Usage (from the project root):  python scripts/make_og.py
Needs Pillow. Reads project data from assets/js/projects.js via Node.
"""
import json
import os
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets', 'og')
IMG = os.path.join(ROOT, 'assets', 'img')
W, H = 1200, 630
INK, MUTED, ACCENT = (23, 23, 23), (115, 115, 115), (5, 105, 255)

FONT_DIRS = [r'C:\Windows\Fonts', '/usr/share/fonts/truetype/dejavu', '/Library/Fonts', '/System/Library/Fonts/Supplemental']
FONT_FILES = {'bold': ['segoeuib.ttf', 'DejaVuSans-Bold.ttf', 'Arial Bold.ttf'],
              'semi': ['seguisb.ttf', 'DejaVuSans-Bold.ttf', 'Arial Bold.ttf'],
              'reg': ['segoeui.ttf', 'DejaVuSans.ttf', 'Arial.ttf'],
              'mono': ['consola.ttf', 'DejaVuSansMono.ttf', 'Courier New.ttf']}


def font(kind, size):
    for d in FONT_DIRS:
        for f in FONT_FILES[kind]:
            p = os.path.join(d, f)
            if os.path.exists(p):
                return ImageFont.truetype(p, size)
    return ImageFont.load_default(size)


def hex_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def load_projects():
    js = "process.stdout.write(JSON.stringify(require('./assets/js/projects.js')))"
    return json.loads(subprocess.check_output(['node', '-e', js], cwd=ROOT))


def wrap(draw, text, fnt, width):
    lines, line = [], ''
    for word in text.split():
        test = (line + ' ' + word).strip()
        if draw.textlength(test, font=fnt) <= width:
            line = test
        else:
            lines.append(line)
            line = word
    lines.append(line)
    return lines


def card(src, width, rotate, radius=18, pad=10):
    """White rounded card holding a screenshot, with soft shadow, rotated."""
    im = Image.open(src).convert('RGB')
    h = round(width * 0.66)
    scale = max(width / im.width, h / im.height)  # cover-fit, anchored to the top
    im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    left = (im.width - width) // 2
    im = im.crop((left, 0, left + width, h))
    cw, ch = width + pad * 2, h + pad * 2
    base = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    m = Image.new('L', (cw, ch), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, cw - 1, ch - 1), radius + 4, fill=255)
    base.paste((255, 255, 255, 255), (0, 0), m)
    im_mask = Image.new('L', (width, h), 0)
    ImageDraw.Draw(im_mask).rounded_rectangle((0, 0, width - 1, h - 1), radius, fill=255)
    base.paste(im, (pad, pad), im_mask)
    shadow_pad = 40
    sh = Image.new('RGBA', (cw + shadow_pad * 2, ch + shadow_pad * 2), (0, 0, 0, 0))
    sm = Image.new('L', sh.size, 0)
    ImageDraw.Draw(sm).rounded_rectangle((shadow_pad, shadow_pad + 14, shadow_pad + cw, shadow_pad + ch + 14), radius + 4, fill=70)
    sh.putalpha(sm.filter(ImageFilter.GaussianBlur(18)))
    sh.alpha_composite(base, (shadow_pad, shadow_pad))
    return sh.rotate(rotate, resample=Image.BICUBIC, expand=True)


def pill(draw, xy, text, fnt, fill, color, dot=None):
    x, y = xy
    tw = draw.textlength(text, font=fnt)
    extra = 22 if dot else 0
    draw.rounded_rectangle((x, y, x + tw + 36 + extra, y + 40), 20, fill=fill)
    if dot:
        draw.ellipse((x + 18, y + 16, x + 26, y + 24), fill=dot)
    draw.text((x + 18 + extra, y + 20), text, font=fnt, fill=color, anchor='lm')


def logo(draw, x, y, color=INK):
    draw.ellipse((x, y, x + 14, y + 14), fill=color)
    draw.ellipse((x + 10, y + 10, x + 26, y + 26), outline=color, width=3)
    draw.text((x + 36, y + 13), 'suphakit.online', font=font('semi', 24), fill=color, anchor='lm')


def home(projects):
    img = Image.new('RGBA', (W, H), (255, 255, 255, 255))
    d = ImageDraw.Draw(img)
    # dotted texture on the right
    for gx in range(620, W, 22):
        for gy in range(0, H, 22):
            d.ellipse((gx, gy, gx + 2, gy + 2), fill=(232, 232, 232))
    shots = [('thai-law-rag', 760, 40, 5, 300), ('crypto-fraud', 900, 250, -6, 270),
             ('popup-analytics', 700, 352, 4, 240), ('nutrilift', 930, 20, -3, 230)]
    covers = {p['slug']: p['cover'] for p in projects}
    for slug, x, y, r, w in shots:
        c = card(os.path.join(IMG, 'projects', covers[slug] + '.webp'), w, r)
        img.alpha_composite(c, (x - 40, y - 40))
    # portrait
    pr = Image.open(os.path.join(IMG, 'portrait.jpg')).convert('RGB').resize((96, 96), Image.LANCZOS)
    m = Image.new('L', (96, 96), 0)
    ImageDraw.Draw(m).ellipse((0, 0, 95, 95), fill=255)
    img.paste(pr, (72, 92), m)
    d.ellipse((150, 166, 168, 184), fill=(34, 197, 94), outline=(255, 255, 255), width=3)
    pill(d, (186, 120), 'Open to co-op & internship', font('semi', 20), (245, 245, 245), INK, dot=(34, 197, 94))
    big, mid = font('bold', 66), font('bold', 40)
    d.text((72, 222), "Hi, I'm ", font=big, fill=INK)
    x = 72 + d.textlength("Hi, I'm ", font=big)
    d.text((x, 222), 'Suphakit', font=big, fill=ACCENT)
    cw = d.textlength('Suphakit', font=big)
    d.arc((x - 6, 306, x + cw + 6, 332), 200, 340, fill=ACCENT, width=5)
    d.text((72, 330), 'I build AI and data systems', font=mid, fill=INK)
    d.text((72, 380), 'you can verify.', font=mid, fill=INK)
    d.text((72, 452), 'CS @ Khon Kaen University · AI & Data', font=font('reg', 22), fill=MUTED)
    logo(d, 72, 548)
    img.convert('RGB').save(os.path.join(OUT, 'og-home.jpg'), 'JPEG', quality=88, optimize=True)


def project(p):
    bg = hex_rgb(p['color'])
    img = Image.new('RGBA', (W, H), bg + (255,))
    d = ImageDraw.Draw(img)
    for gx in range(0, W, 22):
        for gy in range(0, H, 22):
            if gx + gy > 900:
                d.ellipse((gx, gy, gx + 2, gy + 2), fill=tuple(max(0, c - 22) for c in bg))
    c = card(os.path.join(IMG, 'projects', p['cover'] + '.webp'), 560, -4)
    img.alpha_composite(c, (W - c.width + 40, (H - c.height) // 2 + 10))
    status = 'In progress' if p['status'] == 'progress' else 'Completed'
    dot = (217, 160, 0) if p['status'] == 'progress' else (24, 106, 12)
    pill(d, (64, 64), f"{status} · {p['year']}", font('semi', 20), (255, 255, 255), INK, dot=dot)
    title_font = font('bold', 72 if len(p['title']) <= 14 else 60)
    y = 140
    for line in wrap(d, p['title'], title_font, 560):
        d.text((64, y), line, font=title_font, fill=INK)
        y += title_font.size + 8
    y += 12
    for line in wrap(d, p['role']['en'], font('reg', 26), 540)[:3]:
        d.text((64, y), line, font=font('reg', 26), fill=(60, 60, 60))
        y += 36
    # metrics
    x, my = 64, 450
    for value, label in p['metrics'][:3]:
        v_font, l_font = font('bold', 34), font('reg', 17)
        lw = max(d.textlength(value, font=v_font), d.textlength(label['en'], font=l_font)) + 32
        d.rounded_rectangle((x, my, x + lw, my + 80), 16, fill=(255, 255, 255))
        d.text((x + 16, my + 10), value, font=v_font, fill=INK)
        d.text((x + 16, my + 52), label['en'], font=l_font, fill=MUTED)
        x += lw + 10
        if x > 560:
            break
    logo(d, 64, 568)
    img.convert('RGB').save(os.path.join(OUT, p['slug'] + '.jpg'), 'JPEG', quality=88, optimize=True)


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    projects = load_projects()
    home(projects)
    for p in projects:
        project(p)
    print('OG images written to', OUT, file=sys.stderr)
