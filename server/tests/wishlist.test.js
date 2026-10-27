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
  await first.stop();
  const direct = new DatabaseSync(path, { readOnly: true });
  try { assert.equal(direct.prepare('SELECT game_id FROM wishlist').get().game_id, 'hades'); }
  finally { direct.close(); }
  const second = await start(t, path);
  const { items } = await (await fetch(second.url + '/api/wishlist')).json();
  assert.equal(items.length, 1);
  assert.equal(items[0].name, 'Hades');
  assert.equal(items[0].priority, 'normal');
});

test('L14 skeleton routes say they are unfinished instead of pretending to work', async t => {
  const { url } = await start(t, await temporaryDatabase(t));
  for (const [method, path] of [['GET', '/summary'], ['PATCH', '/minecraft'], ['DELETE', '/minecraft']]) {
    const response = await fetch(url + '/api/wishlist' + path, { method });
    assert.equal(response.status, 501);
    assert.match((await response.json()).error, /Lesson 14/);
  }
});
