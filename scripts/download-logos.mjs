const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const domains = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'data', 'domains.json'), 'utf8'));
const logosDir = path.join(__dirname, '..', 'public', 'logos');

if (!fs.existsSync(logosDir)) fs.mkdirSync(logosDir, { recursive: true });

function download(url, timeout = 8000) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/*,*/*'
      },
      timeout
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('timeout'));
    });
  });
}

function getFileExt(buffer) {
  if (buffer[0] === 0x89 && buffer[1] === 0x50) return '.png';
  if (buffer[0] === 0xFF && buffer[1] === 0xD8) return '.jpg';
  if (buffer[0] === 0x47 && buffer[1] === 0x49) return '.gif';
  if (buffer[0] === 0x42 && buffer[1] === 0x4D) return '.bmp';
  if (buffer.toString('utf8', 0, 5) === '<svg ') return '.svg';
  if (buffer.toString('utf8', 0, 4) === 'RIFF') return '.webp';
  return '.ico';
}

async function processDomain(domain) {
  const sources = [
    `https://icon.horse/icon/${domain}`,
    `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_url=ICON&url=https://${domain}&size=128`,
  ];
  
  for (const src of sources) {
    try {
      const buf = await download(src);
      if (buf.length < 100) continue;
      const ext = getFileExt(buf);
      const filename = `${domain}${ext}`;
      fs.writeFileSync(path.join(logosDir, filename), buf);
      return { domain, status: 'ok', file: filename, size: buf.length, source: src.includes('icon.horse') ? 'horse' : 'google' };
    } catch (e) {
      continue;
    }
  }
  return { domain, status: 'failed' };
}

(async () => {
  const results = [];
  let ok = 0, failed = 0;
  
  for (const domain of domains) {
    const r = await processDomain(domain);
    results.push(r);
    if (r.status === 'ok') {
      ok++;
      process.stdout.write('.');
    } else {
      failed++;
      process.stdout.write('x');
    }
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log(`\n\nDone: ${ok} OK, ${failed} failed`);
  if (failed > 0) {
    console.log('Failed:', results.filter(r => r.status === 'failed').map(r => r.domain).join(', '));
  }
  
  const manifest = {};
  results.filter(r => r.status === 'ok').forEach(r => { manifest[r.domain] = `/logos/${r.file}`; });
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'data', 'logo-manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('Manifest saved to public/data/logo-manifest.json');
})();