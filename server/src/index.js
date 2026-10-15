import { createApp } from './app.js';

const port = Number(process.env.API_PORT || 3001);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('API_PORT must be a valid port number.');
}
createApp().listen(port, '127.0.0.1', () => {
  console.log('Player One API: http://127.0.0.1:' + port);
});
