import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { version } from './package.json';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  return {
    plugins: [react()],
    base: '/groundhog/',
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
    define: {
      'import.meta.env.VITE_ENVIRONMENT': JSON.stringify(isDev ? 'dev' : 'prod'),
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(isDev ? `${version}-dev` : version),
    },
  };
});