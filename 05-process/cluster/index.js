/*
 * @Description: 
 * @Date: 2021-05-12 20:22:05
 * @LastEditTime: 2021-05-12 20:31:51
 * @LastEditors: linwei
 */
const cpuNums = require('os').cpus().length;
const cluster = require('cluster');

if(cluster.isMaster) {
  console.log('Master process id is', process.pid);

  // fork workers 
  for(let i = 0; i < cpuNums; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker process died id:', worker.process.pid);
  })
} else {
  // 子进程共享同一个 TCP 连接，即同一个 http 服务
  require('./app.js');
}