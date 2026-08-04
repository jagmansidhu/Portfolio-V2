import { resolveDeezerPreviews } from './_resolveDeezerPreviews.js';

function parseIds(req) {
  if (req.method === 'GET') {
    const raw = req.query?.ids;
    if (!raw) return [];
    const str = Array.isArray(raw) ? raw.join(',') : String(raw);
    return str
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  if (Array.isArray(body.ids)) return body.ids;
  return [];
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let ids;
  try {
    ids = parseIds(req);
  } catch {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  if (ids.length === 0) {
    return res.status(400).json({ error: 'Provide ids (comma-separated or JSON array)' });
  }
  if (ids.length > 12) {
    return res.status(400).json({ error: 'Too many ids (max 12)' });
  }

  try {
    const previews = await resolveDeezerPreviews(ids);
    return res.status(200).json({ previews });
  } catch {
    return res.status(502).json({ error: 'Failed to resolve previews' });
  }
}
