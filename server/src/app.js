import express from 'express';
import { readFile } from 'node:fs/promises';

const catalogUrl = new URL('../../client/src/catalog.json', import.meta.url);

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '10kb' }));

  app.get('/api/demo', async (_req, res) => {
    res.type('html').send(await readFile(new URL('../public/api-demo.html', import.meta.url), 'utf8'));
  });

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'player-one-api' });
  });

  app.get('/api/products', async (_req, res) => {
    const products = JSON.parse(await readFile(catalogUrl, 'utf8'));
    res.json(products);
  });

  app.post('/api/echo', (req, res) => {
    if (!req.is('application/json')) {
      return res.status(415).json({ error: 'Send Content-Type: application/json.' });
    }
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Send a JSON object.' });
    }
    res.json({ received: req.body });
  });

  app.use((_req, res) => res.status(404).json({ error: 'API route not found.' }));
  app.use((error, _req, res, _next) => {
    if (error.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'Send valid JSON.' });
    }
    if (error.type === 'entity.too.large') {
      return res.status(413).json({ error: 'JSON body must be 10 KB or smaller.' });
    }
    console.error('API request failed:', error.message);
    res.status(500).json({ error: 'The API could not complete this request.' });
  });
  return app;
}
