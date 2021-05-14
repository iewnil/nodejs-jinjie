/*
 * @Description: 
 * @Date: 2021-05-12 20:00:21
 * @LastEditTime: 2021-05-12 20:00:49
 * @LastEditors: linwei
 */
const http = require('http')

const server = http.createServer()

server.listen(3000, () => {
  process.title = '进程标题'
  console.log('进程id', process.pid)
})