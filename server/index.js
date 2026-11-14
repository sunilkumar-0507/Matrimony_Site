/**
 * Minimal enquiry backend + production static server (no dependencies).
 *
 *  POST /api/enquiry  – validates and stores an enquiry in server/data/enquiries.json
 *  GET  /*            – serves the built site from dist/ (after `npm run build`)
 *
 * Optional: set ENQUIRY_WEBHOOK_URL to also forward each enquiry as JSON
 * (e.g. to a Google Apps Script, Zapier or Make webhook that emails the team).
 */
import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const distDir = join(root, '..', 'dist');
const dataDir = join(root, 'data');
const dataFile = join(dataDir, 'enquiries.json');
const PORT = Number(process.env.PORT) || 5174;
const WEBHOOK = process.env.ENQUIRY_WEBHOOK_URL;
const LOOKING_FOR = ['Bride', 'Groom', 'Matrimony Services', 'Other'];

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
};

const recent = new Map(); // ip -> [timestamps] for simple rate limiting

function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 20_000) {
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function validate(body) {
  const clean = (v, max) => String(v ?? '').trim().slice(0, max);
  const enquiry = {
    name: clean(body.name, 80),
    mobile: clean(body.mobile, 20),
    email: clean(body.email, 120),
    lookingFor: clean(body.lookingFor, 40),
    message: clean(body.message, 1000),
  };
  const digits = enquiry.mobile.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
  if (enquiry.name.length < 2) return { error: 'Please enter a valid name.' };
  if (!/^[6-9]\d{9}$/.test(digits)) return { error: 'Please enter a valid 10-digit Indian mobile number.' };
  if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(enquiry.email))
    return { error: 'Please enter a valid email address.' };
  if (!LOOKING_FOR.includes(enquiry.lookingFor)) return { error: 'Please select what you are looking for.' };
  enquiry.mobile = `+91 ${digits}`;
  return { enquiry };
}

async function loadEnquiries() {
  try {
    return JSON.parse(await readFile(dataFile, 'utf8'));
  } catch {
    return [];
  }
}

let writeQueue = Promise.resolve();

async function handleEnquiry(req, res) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((t) => now - t < 60 * 60 * 1000);
  if (hits.length >= 10) return json(res, 429, { success: false, message: 'Too many enquiries. Please try again later.' });

  let body;
  try {
    body = JSON.parse(await readBody(req));
  } catch {
    return json(res, 400, { success: false, message: 'Invalid request.' });
  }

  const { enquiry, error } = validate(body);
  if (error) return json(res, 422, { success: false, message: error });

  // Writes are serialised so concurrent submissions never clobber each other
  const result = (writeQueue = writeQueue.then(async () => {
    const all = await loadEnquiries();
    const duplicate = all.find(
      (e) => e.mobile === enquiry.mobile && e.lookingFor === enquiry.lookingFor && now - Date.parse(e.receivedAt) < 10 * 60 * 1000
    );
    if (duplicate) return { duplicate: true };
    const record = { id: `ENQ-${now.toString(36).toUpperCase()}`, ...enquiry, receivedAt: new Date(now).toISOString() };
    all.push(record);
    await mkdir(dataDir, { recursive: true });
    await writeFile(dataFile, JSON.stringify(all, null, 2));
    return { record };
  }));

  try {
    const { record, duplicate } = await result;
    if (duplicate) return json(res, 409, { success: false, message: 'We have already received your enquiry. Our team will contact you shortly.' });
    recent.set(ip, [...hits, now]);
    console.log(`New enquiry ${record.id}: ${record.name} (${record.mobile}) – ${record.lookingFor}`);
    if (WEBHOOK) {
      fetch(WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) }).catch((e) =>
        console.error('Webhook delivery failed:', e.message)
      );
    }
    return json(res, 201, { success: true, id: record.id });
  } catch (e) {
    console.error(e);
    return json(res, 500, { success: false, message: 'Something went wrong. Please try again or call us.' });
  }
}

async function serveStatic(req, res) {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let filePath = normalize(join(distDir, urlPath));
  if (!filePath.startsWith(distDir)) return json(res, 403, { message: 'Forbidden' });
  if (!existsSync(filePath) || urlPath.endsWith('/')) filePath = join(distDir, 'index.html');
  try {
    const content = await readFile(filePath);
    const ext = extname(filePath);
    res.writeHead(200, {
      'Content-Type': mime[ext] || 'application/octet-stream',
      'Cache-Control': urlPath.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
    });
    res.end(content);
  } catch {
    res.writeHead(404).end('Not found – run "npm run build" first.');
  }
}

createServer((req, res) => {
  if (req.url.startsWith('/api/enquiry')) {
    if (req.method !== 'POST') return json(res, 405, { message: 'Method not allowed' });
    return handleEnquiry(req, res);
  }
  if (req.method === 'GET' || req.method === 'HEAD') return serveStatic(req, res);
  json(res, 405, { message: 'Method not allowed' });
}).listen(PORT, () => console.log(`Kalyana Matrimony server running on http://localhost:${PORT}`));
