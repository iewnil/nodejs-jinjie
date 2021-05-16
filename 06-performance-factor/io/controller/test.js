/*
 * @Description: 
 * @Date: 2021-05-14 20:08:31
 * @LastEditTime: 2021-05-14 21:19:36
 * @LastEditors: linwei
 */
const request = require('request-promise');
const Controller = require('../core/controller');

class Test extends Controller {
    constructor(req, res) {
      super(req, res);
    }
    /**
     * 复杂运算
     */
    async bad() {

      // 访问4000端口服务中CPU复杂计算接口
      let result = await request.get('http://127.0.0.1:4000/v1/cpu');
      let sumData = JSON.parse(result);
      let sum = sumData && sumData.data ? sumData.data.sum : false;
      
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