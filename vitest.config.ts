import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
  },
  define: {
    'import.meta.env.VITE_APP_VERSION': '"0.0.0-TEST"',
  },
});