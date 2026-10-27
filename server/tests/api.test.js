import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { once } from 'node:events';
import { readFile } from 'node:fs/promises';
import { createApp } from '../src/app.js';

let server;
let baseUrl;
let app;
before(async () => {
  app = createApp();
  server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  baseUrl = 'http://127.0.0.1:' + server.address().port;
});
after(async () => {
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  app.locals.closeDatabase();
});

test('health returns the documented JSON response', async () => {
  const response = await fetch(baseUrl + '/api/health');
  assert.equal(response.status, 200);
  assert.ok(response.headers.get('content-type').startsWith('application/json'));
  assert.deepEqual(await response.json(), { status: 'ok', service: 'player-one-api' });
});

test('products match the storefront catalog', async () => {
  const response = await fetch(baseUrl + '/api/products');
  const catalog = JSON.parse(await readFile(new URL('../../client/src/catalog.json', import.meta.url), 'utf8'));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), catalog);
});

test('POST echoes a supplied object including nested data', async () => {
  const body = { message: 'Hello Player One', games: ['Minecraft'], nested: { count: 2 } };
  const response = await fetch(baseUrl + '/api/echo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { received: body });
});

test('echo rejects non-JSON requests', async () => {
  const response = await fetch(baseUrl + '/api/echo', { method: 'POST', body: 'hello' });
  assert.equal(response.status, 415);
  assert.equal(typeof (await response.json()).error, 'string');
});

test('malformed JSON and arrays return 400 JSON errors', async () => {
  for (const body of ['{broken', '[]']) {
    const response = await fetch(baseUrl + '/api/echo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    assert.equal(response.status, 400);
    assert.equal(typeof (await response.json()).error, 'string');
  }
});

test('oversized requests return 413 JSON errors', async () => {
  const response = await fetch(baseUrl + '/api/echo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'x'.repeat(11000) }) });
  assert.equal(response.status, 413);
  assert.equal(typeof (await response.json()).error, 'string');
});

test('unknown routes return a JSON 404', async () => {
  const response = await fetch(baseUrl + '/api/not-a-route');
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: 'API route not found.' });
});
