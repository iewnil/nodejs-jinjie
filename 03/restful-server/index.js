/*
 * @Description: 
 * @Date: 2021-05-08 18:01:21
 * @LastEditTime: 2021-05-08 19:29:57
 * @LastEditors: linwei
 */
const http = require('http');
const URL = require('url').URL;
const request = require('request-promise');

const baseMongo =  require('./lib/baseMongodb')();

/**
 * 创建 http 服务，简单返回
 */
const server = http.createServer(async (req, res) => {
    // 拼接 URL 生成实例
    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = myUrl.pathname;

    // 过滤非拉取用户信息请求
    if('/v1/contents' != pathname){
      return setResInfo(res, false, 'path not found', null, 404);
    }

    // 从 db 查询数据，并获取，有可能返回空数据
    let contents = await queryData({}, {limit: 10});
    contents = await getUserInfo(contents);

    return setResInfo(res, true, 'success', contents);
})

// 启动服务
server.listen(4000, () => {
  console.log('server start at http://127.0.0.1:4000');
})


/**
 * db 数据查询，查询简略的用户信息
 * @param {object} queryOption 
 * @returns 
 */
async function queryData(queryOption) {
  const client = await baseMongo.getClient();
  const collection = client.db('nodejs_dev_db').collection('content');
  const queryArr = await collection.find(queryOption).toArray();

  return queryArr;
}

async function getUserInfo(contents) {
  let userIds = [];
  contents.forEach(content => {
    if(content.userId) {
      userIds.push(content.userId);
    }
  })
  if(userIds.length < 1){
    return addUserInfo(contents);
  }

  let userInfos = await callApiServer('http://127.0.0.1:5000/v1/userinfos',userIds.join(','));
  if(!userInfos || userInfos.length < 1){
    return addUserInfo(contents);
  }

  let mapUserInfo = {};
  userInfos.forEach(item => {
    if(userIds.includes(item.id)){
      mapUserInfo[Number(item.id)] = item;
    }
  })

  console.log(mapUserInfo);

  return addUserInfo(contents, mapUserInfo);
}

/**
 * 调用外部 api，暂时只处理 get 请求
 * @param {string} url 
 * @param {string} params 
 * @param {string} method 
 * @returns 
 */
async function callApiServer(url, params, method = 'get') {
  const myURL = new URL(url);
  // 通过 searchParasm 对象API 对URL 查询参数部分写入
  myURL.searchParams.set('user_ids', params);

  let retStr = await request(myURL.href);
  
  try {
    retInfo = JSON.parse(retStr);
  } catch (error) {
    return false;
  }

  if(retInfo.ret !== 0 || !retInfo.data) {
    return false;
  }

  return retInfo.data;
}

/**
 * 
 * @desc 在 content 中增加 userinfo
 * @param {*} contents 
 * @param {*} userinfo 
 */
function addUserInfo(contents, mapUserinfo={}) {
  contents = contents.map(content => {
      content.userInfo = mapUserinfo[content.userId] ? mapUserinfo[content.userId] : {};
      return content;
  });
  return contents;
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
