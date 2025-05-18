import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { name, version } from './package.json'; // Import name and version from package.json

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: '/groundhog/',
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
    define: {
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(mode === 'development' ? `${version}-dev` : version),
      'import.meta.env.VITE_APP_NAME': JSON.stringify(name),
    },
  };
});