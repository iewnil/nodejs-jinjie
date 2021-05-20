/*
 * @Description: 
 * @Date: 2021-05-19 22:32:26
 * @LastEditTime: 2021-05-19 22:46:47
 * @LastEditors: linwei
 */
const URL = require('url').URL;

const baseFun = require('../util/baseFun');

const routerMapping = {
  '/v1/local-cache' : {
      'controller' : 'cache',
      'method' : 'local'
  },
  '/v1/redis-cache' : {
      'controller' : 'cache',
      'method' : 'redis'
  },
  '/v1/both-cache' : {
      'controller' : 'cache',
      'method' : 'both'
  }
}

module.exports = () => {
  return async function(ctx, next) {
    // 获取 get 参数
    const myUrl = new URL(ctx.request.url, `http://${ctx.request.headers.host}`);
    const pathname = myUrl.pathname;

    // 过滤不存在的路由
    if(!routerMapping[pathname]) {
      baseFun.setResInfo(ctx, false, 'path', null, 404);
      return await next();
    }

    // require 对应的 controller 类
    const ControllerClass = require(`../controller/${routerMapping[pathname].controller}`);

    try {
      const controllerObj = new ControllerClass(ctx);
      if(controllerObj[routerMapping[pathname].method][Symbol.toStringTag] === 'AsyncFunction'){
        await controllerObj[routerMapping[pathname].method]();
      } else {
        return controllerObj[routerMapping[pathname].method]();
      }
    } catch (error) {
      console.log(error);
      baseFun.setResInfo(ctx, false, 'server error', null, 500);
      return await next();
    }
  }
}