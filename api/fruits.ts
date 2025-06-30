import type { VercelRequest, VercelResponse } from '@vercel/node';

const handler = async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  console.log('FRUIT_BASE_URL:', process.env.FRUIT_BASE_URL);
  console.log('FRUIT_API_KEY:', process.env.FRUIT_API_KEY);

  if (!process.env.FRUIT_BASE_URL || !process.env.FRUIT_API_KEY) {
    res.status(500).json({ error: "Missing environment variables: FRUIT_BASE_URL or FRUIT_API_KEY" });
    return;
  }

  try {
    const apiRes = await fetch(process.env.FRUIT_BASE_URL, {
      headers: {
        'x-api-key': process.env.FRUIT_API_KEY,
        'Content-Type': 'application/json',
      },
    });
    const data = await apiRes.json();
    res.status(apiRes.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy error', detail: (error as Error).message });
  }
};

export default handler;