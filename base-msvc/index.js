/*
 * @Description: 
 * @Date: 2021-05-09 17:58:50
 * @LastEditTime: 2021-05-09 18:16:25
 * @LastEditors: linwei
 */
const http = require('http');
const URL = require('url').URL;
const ContentController = require('./controller/content');


/**
 * 创建 http 服务，简单返回
 */
const server = http.createServer(async (req, res) => {
  // 拼接 URL 生成实例
  const myUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = myUrl.pathname;

  // 获取业务 controller 实例
  const _contentController = new ContentController(req, res);

  // 过滤非拉取用户信息请求
  if('/v1/contents' != pathname){
    return _contentController.setResInfo(false, 'path not found', null, 404);
  }

  return _contentController.queryContent();
})

// 启动服务
server.listen(4000, () => {
  console.log('server start at http://127.0.0.1:4000');
})