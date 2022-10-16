import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  rollupOptions: {
    input                   : 'src/main.js',
    format                  : 'system',
    preserveEntrySignatures : true
  },
  base    : 'http://localhost:3000',
  plugins : [vue(), eslintPlugin()]
})
