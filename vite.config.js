import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig(({ command }) => {
  return {
    root: resolve(__dirname, './example'),
    server: {
      port: 4129,
      open: true,
      host: '0.0.0.0',
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
