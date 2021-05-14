/*
 * @Description: 
 * @Date: 2021-05-09 17:47:13
 * @LastEditTime: 2021-05-09 17:47:54
 * @LastEditors: linwei
 */
const request = require('request-promise');

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

module.exports = {
  callApiServer
}