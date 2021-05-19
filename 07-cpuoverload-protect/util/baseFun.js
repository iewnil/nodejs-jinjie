/*
 * @Description: 
 * @Date: 2021-05-09 17:48:51
 * @LastEditTime: 2021-05-09 17:49:12
 * @LastEditors: linwei
 */

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

module.exports = {
  setResInfo
}