import { DatabaseSync } from 'node:sqlite';
import { databasePath, openWishlistStore } from '../src/wishlist-store.js';

const path = databasePath();
if (process.argv[2] === 'init') {
  openWishlistStore(path).close();
  console.log('Wishlist database initialized at ' + path);
} else if (process.argv[2] === 'inspect') {
  const db = new DatabaseSync(path, { readOnly: true });
  try {
    console.log(JSON.stringify({
      schema: db.prepare("SELECT sql FROM sqlite_master WHERE name = 'wishlist'").get(),
      rows: db.prepare('SELECT game_id, priority, created_at FROM wishlist ORDER BY created_at, game_id').all(),
    }, null, 2));
  } finally {
    db.close();
  }
} else {
  throw new Error('Use npm run db:init or npm run db:inspect.');
}
