/*
 * @Description: 
 * @Date: 2021-05-19 22:29:47
 * @LastEditTime: 2021-05-19 22:31:33
 * @LastEditors: linwei
 */
const Koa = require('koa');
const app = new Koa();
const routerMiddleware = require('./middleware/router');

app.use(routerMiddleware());

app.listen(3000,()=> console.log('cache index run listen on port 3000'));