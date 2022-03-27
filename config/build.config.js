import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')
import styleImport, { VantResolve } from 'vite-plugin-style-import'
const process = require('process')
const pathArr = process.argv[3].split('/')
const pathName = pathArr[1]
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vant 按需引入
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
      '@pages': resolve('pages'),
    },
  },
  base: `/${pathName}/`,
  build: {
    outDir: '../../dist/' + pathName,
    rollupOptions: {
      input: {
        index: resolve(__dirname, '/index.html'),
      },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/assets/[name]-[hash].[ext]',
      },
    },
  },
})
