const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0',
];

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const ua = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
  const start = Date.now();

  try {
    const response = await fetch(process.env.BACKEND_URL, {
      method: 'GET',
      headers: { 'User-Agent': ua, 'Cache-Control': 'no-cache' },
      signal: AbortSignal.timeout(10000),
    });

    return res.status(200).json({
      ok: true,
      backendStatus: response.status,
      responseMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}