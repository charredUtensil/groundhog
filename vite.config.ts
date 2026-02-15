import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { version } from './package.json';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: '/groundhog/',
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
    define: {
      'process.env.VITE_APP_VERSION': JSON.stringify(mode === 'development' ? `${version}-dev` : version),
    },
  };
});