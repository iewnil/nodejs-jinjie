/*
 * @Description: 
 * @Date: 2021-05-12 20:08:16
 * @LastEditTime: 2021-05-12 20:08:17
 * @LastEditors: linwei
 */
const http = require('http')
const longComputation = () => {
  let sum = 0
  for (let i = 0; i < 1e10; i++) {
    sum += i
  }
  return sum
}
const server = http.createServer()
server.on('request', (req, res) => {
  if (req.url === '/compute') {
    console.info('计算开始', new Date())
    const sum = longComputation()
    console.info('计算结束', new Date())
    return res.end(`Sum is ${sum}`)
  } else {
    res.end('Ok')
  }
})

server.listen(3000)