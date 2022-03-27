const concurrently = require('concurrently')
const glob = require('glob')
const { clear } = require('console');
const process = require('process')
const removeDir = require('./utils/removeDir')
const copyFile = require('./utils/copyFile')
try {
  // 删除文件夹dist
  removeDir('./dist')
} catch(e){
}

copyFile('./public', './dist')

const pages = process.argv.slice(2)
if(pages.length === 0) {
    // 遍历文件夹中含有main.js的文件夹路径
  const allEntry = glob.sync('./pages/**/main.js')
  // 创建多页面模板
  allEntry.forEach((entry) => {
    const pathArr = entry.split('/')
    const name = pathArr[pathArr.length - 2]
    pages.push(name)
  })
}

let executeCommandList = pages.map(name=> {
  return `npx vite build pages/${name}  -c config/build.config.js`
})

console.log(executeCommandList)

concurrently(executeCommandList).result.then((res)=> {
  clear()
  console.log(`pages [${pages}] build finished`)
})
