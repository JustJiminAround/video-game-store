import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function databasePath() {
  return process.env.API_DB_PATH
    ? resolve(process.env.API_DB_PATH)
    : fileURLToPath(new URL('../data/player-one.sqlite', import.meta.url));
}

export function openWishlistStore(path = ':memory:') {
  if (path !== ':memory:') mkdirSync(dirname(resolve(path)), { recursive: true });
  const db = new DatabaseSync(path);
  try {
    db.exec(readFileSync(new URL('../schema.sql', import.meta.url), 'utf8'));
  } catch (error) {
    db.close();
    throw error;
  }
  const list = db.prepare('SELECT game_id AS gameId, priority, created_at AS createdAt FROM wishlist ORDER BY created_at, game_id');
  const insert = db.prepare('INSERT INTO wishlist (game_id) VALUES (?) ON CONFLICT(game_id) DO NOTHING');
  const update = db.prepare('UPDATE wishlist SET priority = ? WHERE game_id = ?');
  const remove = db.prepare('DELETE FROM wishlist WHERE game_id = ?');
  return {
    all: () => list.all().map(row => ({ ...row })),
    add: gameId => insert.run(gameId).changes === 1,
    setPriority: (gameId, priority) => update.run(priority, gameId).changes === 1,
    remove: gameId => remove.run(gameId).changes === 1,
    close: () => { if (db.isOpen) db.close(); },
  };
}
