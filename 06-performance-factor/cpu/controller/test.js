/*
 * @Description: 
 * @Date: 2021-05-14 20:08:31
 * @LastEditTime: 2021-05-14 20:47:48
 * @LastEditors: linwei
 */
const Controller = require('../core/controller');

class Test extends Controller {
    constructor(req, res) {
      super(req, res);
    }
    /**
     * 复杂运算
     */
    bad() {
      let sum = 0;
      for(let i=0; i<10000000000; i++){
          sum = sum + i;
      }
      
      return this.setResInfo(true, 'success', {'sum' : sum});
    }

    /**
     * 正常请求
     */
    normal() {
      return this.setResInfo(true, 'good', 'hello world');
    }
}

module.exports = Test;