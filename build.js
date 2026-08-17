const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'dist');

const PIXEL_ID = process.env.META_PIXEL_ID || '';

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// Copy static assets as-is
for (const entry of ['styles.css', 'script.js', 'images', 'video']) {
  const src = path.join(ROOT, entry);
  if (fs.existsSync(src)) {
    copyRecursive(src, path.join(OUT, entry));
  }
}

// Inject META_PIXEL_ID into index.html
const html = fs
  .readFileSync(path.join(ROOT, 'index.html'), 'utf8')
  .split('%%META_PIXEL_ID%%')
  .join(PIXEL_ID);

fs.writeFileSync(path.join(OUT, 'index.html'), html);

console.log(
  PIXEL_ID
    ? 'Build done — META_PIXEL_ID injected.'
    : 'Build done — META_PIXEL_ID not set, Pixel code left blank.'
);
