import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig(({ command }) => {
  return {
    root: resolve(__dirname, './example'),
    server: {
      port: 8415,
      open: true,
    },
    publicDir: command === 'build' ? false : resolve(__dirname, './public'),
    build: {
      target: 'chrome74',
      outDir: resolve(__dirname, './dist'),
      lib: {
        fileName: 'index',
        name: 'SequenceFrame',
        formats: ['umd', 'es'],
        entry: resolve(__dirname, './lib/index.ts'),
      },
    },
  };
});
