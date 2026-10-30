// Local preview that behaves like Vercel (redirects from vercel.json + cleanUrls + 404.html):
// node server.js → http://127.0.0.1:4300
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const port = Number(process.env.PORT || 4300);

// vercel.json redirect sources use path-to-regexp: ":name", ":name(regex)" and "(regex)" groups
const redirects = (JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8')).redirects || []).map((r) => {
  const pattern = r.source
    .replace(/:(\w+)\(([^)]+)\)/g, '(?<$1>$2)')
    .replace(/:(\w+)/g, '(?<$1>[^/]+)');
  return { re: new RegExp('^' + pattern + '$'), to: r.destination, status: r.permanent === false ? 307 : 308 };
});
function redirectFor(pathname) {
  for (const r of redirects) {
    const m = pathname.match(r.re);
    if (m) return { status: r.status, location: r.to.replace(/:(\w+)/g, (_, k) => (m.groups || {})[k] ?? '') };
  }
  return null;
}
const mime = {'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.pdf':'application/pdf'};

function resolve(pathname) {
  const base = path.resolve(root, '.' + pathname);
  if (base !== root && !base.startsWith(root + path.sep)) return null;
  for (const f of [base, path.join(base, 'index.html'), base + '.html']) {
    try { if (fs.statSync(f).isFile()) return f; } catch { /* try next */ }
  }
  return undefined;
}

http.createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch { res.writeHead(400).end(); return; }
  const redirect = redirectFor(pathname);
  if (redirect) { res.writeHead(redirect.status, { Location: redirect.location }).end(); return; }
  let file = resolve(pathname), status = 200;
  if (file === null) { res.writeHead(403).end(); return; }
  if (!file) { file = path.join(root, '404.html'); status = 404; }
  const stat = fs.statSync(file);
  res.writeHead(status, { 'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Content-Length': stat.size });
  if (req.method === 'HEAD') res.end(); else fs.createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`http://127.0.0.1:${port}/`));
