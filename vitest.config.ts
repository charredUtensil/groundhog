import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
  },
  define: {
    'import.meta.env.VITE_ENVIRONMENT': JSON.stringify('test'),
    'import.meta.env.VITE_APP_VERSION': JSON.stringify("0.0.0-test"),
  },
});