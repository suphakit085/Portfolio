// Pre-deploy checks for the static site:  node scripts/check.js
// Verifies generated pages are up to date, every internal link/asset exists,
// pages carry SEO meta, and nothing local leaks into deployable files.
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const root = path.join(__dirname, '..');
const rel = (f) => path.relative(root, f).split(path.sep).join('/');
let failed = 0;
const ok = (msg) => console.log('  ✓ ' + msg);
const bad = (msg) => { failed++; console.log('  ✗ ' + msg); };

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', '.claude', 'node_modules', '.vercel'].includes(e.name)) continue;
    const f = path.join(dir, e.name);
    e.isDirectory() ? walk(f, out) : out.push(f);
  }
  return out;
}
const exists = (p) => {
  const f = path.join(root, p.split('#')[0].split('?')[0]);
  return [f, path.join(f, 'index.html'), f + '.html'].some((x) => fs.existsSync(x) && fs.statSync(x).isFile());
};

/* 1. generated pages are up to date with the data files */
console.log('Generated pages');
execSync('node build.js', { cwd: root, stdio: 'ignore' });
const dirty = execSync('git status --porcelain -- projects 404.html robots.txt', { cwd: root }).toString().trim();
dirty ? bad('build.js output differs from the committed files — commit the rebuilt pages:\n' + dirty) : ok('projects/*, 404.html, robots.txt match the data');

/* 2. internal references */
console.log('Internal links and assets');
const ignore = (s) => s.split(path.sep).includes('scripts') || /(^|\/)(server|build)\.js$/.test(rel(s));
const files = walk(root).filter((f) => /\.(html|js|css)$/.test(f) && !ignore(f));
const refs = new Map();
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const re = /(?:href|src|content)="(\/[^"]*)"|['"`](\/(?:assets|projects)\/[^'"`$]+)['"`]|url\((\/[^)]+)\)|'(\/(?:resume|transcript)\.pdf)'/g;
  for (const m of src.matchAll(re)) {
    const p = m[1] || m[2] || m[3] || m[4];
    if (p === '/' || p.startsWith('//') || p.startsWith('/_vercel/') || p.includes('${')) continue;
    if (!refs.has(p)) refs.set(p, rel(f));
  }
}
// image names referenced by data files (built at runtime as /assets/img/projects/<name>[-sm].webp)
const D = require(path.join(root, 'assets/js/data.js'));
const PR = require(path.join(root, 'assets/js/projects.js'));
for (const p of PR) {
  for (const n of [p.cover, ...p.gallery.map((g) => g.src)]) {
    for (const s of ['', '-sm']) refs.set(`/assets/img/projects/${n}${s}.webp`, 'projects.js');
  }
  refs.set(`/assets/og/${p.slug}.jpg`, 'og:image');
  refs.set(`/projects/${p.slug}`, 'projects.js');
}
for (const n of D.notes) if (n.slug && !PR.find((p) => p.slug === n.slug)) bad(`note links to unknown project "${n.slug}"`);
for (const c of D.showcase) for (const w of c.works) if (!PR.find((p) => p.slug === w)) bad(`showcase "${c.key}" lists unknown project "${w}"`);
for (const [k] of D.heroCards) if (k !== 'portrait' && !PR.find((p) => p.slug === k)) bad(`hero card uses unknown project "${k}"`);
const missing = [...refs].filter(([p]) => !exists(p));
missing.length ? missing.forEach(([p, from]) => bad(`missing ${p} (referenced in ${from})`)) : ok(`${refs.size} internal references resolve`);

/* 3. SEO meta on every page */
console.log('SEO meta');
const pages = walk(root).filter((f) => f.endsWith('.html') && !ignore(f));
for (const f of pages) {
  const h = fs.readFileSync(f, 'utf8');
  const need = ['<title>', 'name="description"', 'property="og:image"', 'name="viewport"'];
  if (!f.endsWith('404.html')) need.push('rel="canonical"');
  const lack = need.filter((n) => !h.includes(n));
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { lack.push('valid JSON-LD'); }
  }
  lack.length ? bad(`${rel(f)} lacks ${lack.join(', ')}`) : null;
}
ok(`${pages.length} pages checked for title, description, canonical, og:image, viewport, JSON-LD`);

/* 4. nothing local leaks into deployable files */
console.log('Leaks');
const deployable = walk(root).filter((f) => /\.(html|js|css|json|xml|txt)$/.test(f) && !ignore(f));
const leaks = deployable.filter((f) => /localhost|127\.0\.0\.1|C:\\|\/Users\//.test(fs.readFileSync(f, 'utf8').replace(/\^\(localhost\|127\\\.0\\\.0\\\.1\|\\\[::1\\\]\)\$/, '')));
leaks.length ? leaks.forEach((f) => bad(`local path or host in ${rel(f)}`)) : ok('no localhost URLs or local file paths');
try { JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8')); ok('vercel.json is valid JSON'); } catch (e) { bad('vercel.json: ' + e.message); }

/* 5. size */
console.log('Size');
const sizes = walk(root).filter((f) => !ignore(f) && !/README|\.git|vercelignore|favicon\.svg$/.test(rel(f))).map((f) => [rel(f), fs.statSync(f).size]);
const total = sizes.reduce((a, [, s]) => a + s, 0);
const big = sizes.filter(([, s]) => s > 400 * 1024);
ok(`${sizes.length} files, ${(total / 1024 / 1024).toFixed(1)} MB total`);
big.forEach(([f, s]) => console.log(`  ! large file ${f} (${Math.round(s / 1024)} KB)`));

console.log(failed ? `\n${failed} problem(s) found.` : '\nAll checks passed.');
process.exit(failed ? 1 : 0);
