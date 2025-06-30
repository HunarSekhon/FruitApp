import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  

  try {
    const apiRes = await fetch(process.env.VITE_FRUIT_BASE_URL!, {
      headers: {
        'x-api-key': process.env.VITE_FRUIT_API_KEY!,
        'Content-Type': 'application/json',
      },
    });
    const data = await apiRes.json();
    res.status(apiRes.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error', detail: (error as Error).message });
  }
}