import { defineConfig } from 'vite';

const productionBase = '/GAME_SLUG/';

export default defineConfig(({ mode }) => ({
  // Local development remains at http://localhost:5173/.
  // Production assets are emitted beneath /GAME_SLUG/.
  base: mode === 'production' ? productionBase : '/',
}));
