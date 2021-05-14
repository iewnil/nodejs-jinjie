/*
 * @Description: 
 * @Date: 2021-05-06 22:09:33
 * @LastEditTime: 2021-05-08 09:09:17
 * @LastEditors: linwei
 */

const http = require('http');
const URL = require('url').URL;
const baseMongo = require('./lib/baseMongodb')();

/**
 * 创建 http 服务，简单返回
 */
const server = http.createServer(async (req,res)=>{
  // 拼接 URL 生成实例
  const myUrl = new URL(req.url, `http://${req.headers.host}`);
  // 通过 searchParams 对象API对 URL 查询部分读写
  const user_ids = myUrl.searchParams.get('user_ids');
  const pathname = myUrl.pathname;

  // 过滤非拉取用户信息请求
  if('/v1/userinfos' != pathname){
    return setResInfo(res, false, 'path not found', null, 404);
  }

  // 参数校验，没有包含参数时返回错误
  if(!user_ids){
    return setResInfo(res, false, 'params error');
  }

  // 从 db 根据 use_ids 查询数据，并获取，有可能返回空数据
  const userInfo = await queryData({ id: { $in: user_ids.split(',').map(id=> Number(id))}});
  
  return setResInfo(res, true, 'success', userInfo);
})

// 启动服务
server.listen(5000,()=>{
  console.log('server start at http://127.0.0.1:5000');
})


/**
 * db 数据查询
 * @param {object} queryOption 
 * @returns 
 */
async function queryData(queryOption) {
  // 连接 db 的 client对象
  const client = await baseMongo.getClient();
  // 获取指定的数据库下的集合 user
  const collection = client.db('nodejs_dev_db').collection('user');
  // 查询集合下符合条件的文档，并转成数组
  const queryArr = await collection.find(queryOption).toArray();
  
  return queryArr; 
}

/**
 * 设置响应数据
 * @param {object} res 
 * @param {boolean} ret 
 * @param {string} message 
 * @param {object} dataInfo 
 * @param {number} httpStatus 
 * @returns 
 */
function setResInfo(res, ret, message, dataInfo, httpStatus = 200) {
  let retInfo = {};

  if(!ret) {
    retInfo = {
      ret: -1,
      message: message ? message : 'error',
      data: {}
    };
  } else {
    retInfo = {
      ret: 0,
      message: message ? message : 'success',
      data: dataInfo ? dataInfo : {}
    };
  }

  res.writeHead(httpStatus, { 'Content-Type': 'text/plain;charset=UTF-8' }); // UTF-8防止输出中文乱码
  res.write(JSON.stringify(retInfo));
  res.end();
  
  return ;
}