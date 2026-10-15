import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'API_');
  const apiPort = Number(env.API_PORT || 3001);
  if (!Number.isInteger(apiPort) || apiPort < 1 || apiPort > 65535) {
    throw new Error('API_PORT must be a valid port number.');
  }
  return {
    plugins: [react()],
    server: {
      proxy: { '/api': 'http://127.0.0.1:' + apiPort },
    },
  };
});
