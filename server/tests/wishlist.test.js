import assert from 'node:assert/strict';
import { test } from 'node:test';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { createApp } from '../src/app.js';

async function temporaryDatabase(t) {
  const directory = await mkdtemp(join(tmpdir(), 'player-one-wishlist-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return join(directory, 'test.sqlite');
}

async function start(t, dbPath) {
  const app = createApp({ dbPath });
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const url = 'http://127.0.0.1:' + server.address().port;
  let stopped = false;
  const stop = async () => {
    if (stopped) return;
    stopped = true;
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    app.locals.closeDatabase();
  };
  t.after(stop);
  return { url, stop, app };
}

function save(url, body, headers = { 'Content-Type': 'application/json' }) {
  return fetch(url + '/api/wishlist', { method: 'POST', headers, body: JSON.stringify(body) });
}

test('a saved game is a real SQLite row and is returned with catalog details', async t => {
  const path = await temporaryDatabase(t);
  const { url } = await start(t, path);
  assert.deepEqual(await (await fetch(url + '/api/wishlist')).json(), { items: [] });
  const response = await save(url, { gameId: 'minecraft' });
  assert.equal(response.status, 201);
  const { item } = await response.json();
  assert.equal(item.gameId, 'minecraft');
  assert.equal(item.priority, 'normal');
  assert.equal(item.priceCents, 2999);
  assert.equal(item.name, 'Minecraft');
  const db = new DatabaseSync(path, { readOnly: true });
  try {
    assert.deepEqual({ ...db.prepare('SELECT game_id, priority FROM wishlist').get() }, { game_id: 'minecraft', priority: 'normal' });
  } finally { db.close(); }
  const list = await fetch(url + '/api/wishlist');
  assert.equal(list.status, 200);
  assert.deepEqual(await list.json(), { items: [item] });
});

test('simultaneous duplicate saves return one success and one conflict', async t => {
  const { url } = await start(t, await temporaryDatabase(t));
  const responses = await Promise.all([save(url, { gameId: 'hades' }), save(url, { gameId: 'hades' })]);
  assert.deepEqual(responses.map(response => response.status).sort(), [201, 409]);
  assert.equal((await (await fetch(url + '/api/wishlist')).json()).items.length, 1);
});

test('invalid bodies, unknown IDs, and wrong content types cannot create rows', async t => {
  const { url } = await start(t, await temporaryDatabase(t));
  for (const body of [null, [], {}, { gameId: 1 }, { gameId: '' }, { gameId: 'minecraft', priority: 'high' }]) {
    assert.equal((await save(url, body)).status, 400);
  }
  assert.equal((await save(url, { gameId: "minecraft'); DROP TABLE wishlist; --" })).status, 404);
  assert.equal((await save(url, { gameId: 'minecraft' }, { 'Content-Type': 'text/plain' })).status, 415);
  const malformed = await fetch(url + '/api/wishlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{broken' });
  assert.equal(malformed.status, 400);
  assert.deepEqual(await (await fetch(url + '/api/wishlist')).json(), { items: [] });
});

test('a saved game survives closing the server and reopening the database', async t => {
  const path = await temporaryDatabase(t);
  const first = await start(t, path);
  assert.equal((await save(first.url, { gameId: 'hades' })).status, 201);
  const changed = await fetch(first.url + '/api/wishlist/hades', {
    method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ priority: 'high' }),
  });
  assert.equal(changed.status, 200);
  await first.stop();
  const direct = new DatabaseSync(path, { readOnly: true });
  try { assert.equal(direct.prepare('SELECT priority FROM wishlist WHERE game_id = ?').get('hades').priority, 'high'); }
  finally { direct.close(); }
  const second = await start(t, path);
  const { items } = await (await fetch(second.url + '/api/wishlist')).json();
  assert.equal(items.length, 1);
  assert.equal(items[0].name, 'Hades');
  assert.equal(items[0].priority, 'high');
});

test('summary reflects stored choices, priority updates and real deletions', async t => {
  const path = await temporaryDatabase(t);
  const { url, stop } = await start(t, path);
  const summary = async () => {
    const response = await fetch(url + '/api/wishlist/summary');
    assert.equal(response.status, 200);
    return response.json();
  };
  assert.deepEqual(await summary(), { count: 0, highPriorityCount: 0, totalSamplePriceCents: 0 });
  await save(url, { gameId: 'minecraft' });
  await save(url, { gameId: 'hades' });
  assert.deepEqual(await summary(), { count: 2, highPriorityCount: 0, totalSamplePriceCents: 5498 });
  const updated = await fetch(url + '/api/wishlist/hades', {
    method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ priority: 'high' }),
  });
  assert.equal(updated.status, 200);
  assert.equal((await updated.json()).item.priority, 'high');
  assert.deepEqual(await summary(), { count: 2, highPriorityCount: 1, totalSamplePriceCents: 5498 });
  const removed = await fetch(url + '/api/wishlist/minecraft', { method: 'DELETE' });
  assert.equal(removed.status, 204);
  assert.equal(await removed.text(), '');
  assert.deepEqual(await summary(), { count: 1, highPriorityCount: 1, totalSamplePriceCents: 2499 });
  await stop();
  const direct = new DatabaseSync(path, { readOnly: true });
  try { assert.equal(direct.prepare('SELECT * FROM wishlist WHERE game_id = ?').get('minecraft'), undefined); }
  finally { direct.close(); }
  const restarted = await start(t, path);
  assert.deepEqual(await (await fetch(restarted.url + '/api/wishlist/summary')).json(), {
    count: 1, highPriorityCount: 1, totalSamplePriceCents: 2499,
  });
  assert.equal((await fetch(restarted.url + '/api/wishlist/hades', { method: 'DELETE' })).status, 204);
  assert.deepEqual(await (await fetch(restarted.url + '/api/wishlist')).json(), { items: [] });
});

test('invalid updates and missing rows return JSON errors without changing saved data', async t => {
  const { url } = await start(t, await temporaryDatabase(t));
  await save(url, { gameId: 'minecraft' });
  for (const body of [null, [], {}, { priority: 'urgent' }, { priority: 1 }, { priority: 'high', extra: true }]) {
    const response = await fetch(url + '/api/wishlist/minecraft', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    assert.equal(response.status, 400);
    assert.equal(typeof (await response.json()).error, 'string');
  }
  assert.equal((await fetch(url + '/api/wishlist/minecraft', { method: 'PATCH', body: 'high' })).status, 415);
  const absent = await fetch(url + '/api/wishlist/missing', {
    method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ priority: 'high' }),
  });
  assert.equal(absent.status, 404);
  assert.equal((await fetch(url + '/api/wishlist/missing', { method: 'DELETE' })).status, 404);
  const { items } = await (await fetch(url + '/api/wishlist')).json();
  assert.equal(items.length, 1);
  assert.equal(items[0].priority, 'normal');
});
