import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')
const glob = require('glob')
const fs = require('fs')

const pageEntry = {} // 入口配置
const temp = fs.readFileSync('./template/template.html')
// 匹配文件入口
;(function () {
  const allEntry = glob.sync('./pages/**/main.js')
  allEntry.forEach((entry) => {
    const pathArr = entry.split('/')
    const name = pathArr[pathArr.length - 2]
    pageEntry[name] = resolve(__dirname, `/pages/${name}/index.html`)
  })
  // 创建html文件
  const index = temp.toString().indexOf('</body>')
  let content = Object.keys(pageEntry)
    .map((name) => {
      return `
      <p>
        <a href="/${name}/">
          /${name}/index.html
        </a>
      </p>
    `
    })
    .join('')
  content =
    temp.toString().slice(0, index) + content + temp.toString().slice(index)
  fs.writeFile('./pages/index.html', content, (err) => {
    if (err) console.log(err)
  })
})()

// 路径自动重定向
const proxys = {}
Object.keys(pageEntry).forEach((name) => {
  var re = `^/${name}$`
  proxys[re] = {
    target: '/',
    bypass: function (req, res) {
      res.writeHead(302, { Location: `/${name}/` })
      res.end()
    },
  }
})

export default defineConfig({
  plugins: [
    vue()
  ],
  root: 'pages/',
  server: {
    host: '0.0.0.0',
    open: '/',
    proxy: {
      ...proxys,
    },
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      '@pages': resolve('pages'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...pageEntry,
      },
    },
  },
})
