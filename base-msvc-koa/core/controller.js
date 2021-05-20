/*
 * @Description: 
 * @Date: 2021-05-19 22:48:13
 * @LastEditTime: 2021-05-19 22:48:55
 * @LastEditors: linwei
 */
const baseFun = require('../util/baseFun');

class Controller {
  constructor(ctx) {
    this.ctx = ctx;
  }

  setResInfo(ret, message, dataInfo, httpStatus = 200) {
    return baseFun.setResInfo(this.ctx, ret, message, dataInfo, httpStatus);
  }
}

module.exports = Controller;