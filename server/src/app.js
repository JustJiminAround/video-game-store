import express from 'express';
import { readFile } from 'node:fs/promises';
import { openWishlistStore } from './wishlist-store.js';

const catalogUrl = new URL('../../client/src/catalog.json', import.meta.url);

export function createApp({ dbPath = ':memory:' } = {}) {
  const app = express();
  const wishlist = openWishlistStore(dbPath);
  app.locals.closeDatabase = () => wishlist.close();
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

  async function wishlistItems() {
    const catalog = JSON.parse(await readFile(catalogUrl, 'utf8'));
    return wishlist.all().map(row => {
      const game = catalog.find(item => item.id === row.gameId);
      return {
        ...row,
        name: game?.name ?? row.gameId,
        priceCents: game ? Math.round(game.price * 100) : 0,
        image: game?.image ?? null,
      };
    });
  }

  app.get('/api/wishlist', async (_req, res) => {
    res.json({ items: await wishlistItems() });
  });

  app.post('/api/wishlist', async (req, res) => {
    if (!req.is('application/json')) {
      return res.status(415).json({ error: 'Send Content-Type: application/json.' });
    }
    const body = req.body;
    if (!body || Array.isArray(body) || typeof body !== 'object'
      || Object.keys(body).length !== 1 || typeof body.gameId !== 'string' || !body.gameId) {
      return res.status(400).json({ error: 'Send a JSON object containing only a gameId string.' });
    }
    const catalog = JSON.parse(await readFile(catalogUrl, 'utf8'));
    if (!catalog.some(game => game.id === body.gameId)) {
      return res.status(404).json({ error: 'That game is not in the catalog.' });
    }
    if (!wishlist.add(body.gameId)) {
      return res.status(409).json({ error: 'That game is already saved.' });
    }
    const item = (await wishlistItems()).find(game => game.gameId === body.gameId);
    res.status(201).json({ item });
  });

  app.get('/api/wishlist/summary', async (_req, res) => {
    const items = await wishlistItems();
    res.json({
      count: items.length,
      highPriorityCount: items.filter(item => item.priority === 'high').length,
      totalSamplePriceCents: items.reduce((total, item) => total + item.priceCents, 0),
    });
  });

  app.patch('/api/wishlist/:gameId', async (req, res) => {
    if (!req.is('application/json')) {
      return res.status(415).json({ error: 'Send Content-Type: application/json.' });
    }
    const body = req.body;
    if (!body || Array.isArray(body) || typeof body !== 'object'
      || Object.keys(body).length !== 1 || !['normal', 'high'].includes(body.priority)) {
      return res.status(400).json({ error: 'Send only a priority of normal or high.' });
    }
    if (!wishlist.setPriority(req.params.gameId, body.priority)) {
      return res.status(404).json({ error: 'That game is not saved in the wishlist.' });
    }
    const item = (await wishlistItems()).find(game => game.gameId === req.params.gameId);
    res.json({ item });
  });

  app.delete('/api/wishlist/:gameId', (req, res) => {
    if (!wishlist.remove(req.params.gameId)) {
      return res.status(404).json({ error: 'That game is not saved in the wishlist.' });
    }
    res.status(204).end();
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
