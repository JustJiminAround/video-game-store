import { createApp } from './app.js';
import { databasePath } from './wishlist-store.js';

const port = Number(process.env.API_PORT || 3001);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('API_PORT must be a valid port number.');
}
const app = createApp({ dbPath: databasePath() });
const server = app.listen(port, '127.0.0.1', () => {
  console.log('Player One API: http://127.0.0.1:' + port);
});

let shuttingDown = false;
function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  server.close(() => {
    app.locals.closeDatabase();
    process.exit(0);
  });
}
process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
