/*
 * @Description: 
 * @Date: 2021-05-09 17:48:51
 * @LastEditTime: 2021-05-20 00:06:24
 * @LastEditors: linwei
 */

/**
 * 设置响应数据
 * @param {object} ctx 
 * @param {string} message 
 * @param {object} dataInfo 
 * @param {number} httpStatus 
 * @returns 
 */
function setResInfo(ctx, ret, message, dataInfo, httpStatus = 200) {
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
  
  ctx.response.type = 'text/plain;charset=UTF-8';
  ctx.response.status = httpStatus;
  ctx.response.body = JSON.stringify(retInfo);

  return ;
}

module.exports = {
  setResInfo
}