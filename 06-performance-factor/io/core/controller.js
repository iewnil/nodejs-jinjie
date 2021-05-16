/*
 * @Description: 
 * @Date: 2021-05-08 21:26:15
 * @LastEditTime: 2021-05-08 21:44:06
 * @LastEditors: linwei
 */
const baseFun = require('../util/baseFun');

class Controller {
  constructor(req,res) {
    this.req = req;
    this.res = res;
  }

  setResInfo(ret, message, dataInfo, httpStatus = 200) {
    return baseFun.setResInfo(this.res, ret, message, dataInfo, httpStatus);
  }
}

module.exports = Controller;