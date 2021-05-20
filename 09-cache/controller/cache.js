/*
 * @Description: 
 * @Date: 2021-05-19 22:47:28
 * @LastEditTime: 2021-05-20 16:18:45
 * @LastEditors: linwei
 */
const Controller = require('../core/controller');

const cache = require('../util/cache')(true, false);
const redisCache = require('../util/cache')(false, true);
const bothCache = require('../util/cache')(true, true);

class CacheController extends Controller {

  async local(){
    const cacheKey = 'sum_result';
    let result = await cache.get(cacheKey);
    if(!result){
      result = 0;
      for(let i = 0; i < 1000000000; i++){
        result = result + i;
      }
      cache.set(cacheKey, result, 10).then();
    }
    return this.setResInfo(true, 'success', `sum 0 - 1000000000 is ${result}`);
  }

  async redis() {
    const cacheKey = 'sum_result';
    let result = await redisCache.get(cacheKey);
    if(!result){
      result = 0;
      for(let i = 0; i < 1000000000; i++){
        result = result + i;
      }
      redisCache.set(cacheKey, result, 10).then();
    }
    return this.setResInfo(true, 'success', `sum 0 - 1000000000 is ${result}`);
  }

  async both() {
    const cacheKey = 'sum_result';
    let result = await bothCache.get(cacheKey);
    if(!result){
      result = 0;
      for(let i = 0; i < 1000000000; i++){
        result = result + i;
      }
      bothCache.set(cacheKey, result, 600).then();
    }
    return this.setResInfo(true, 'success', `sum 0 - 1000000000 is ${result}`);
  }
}

module.exports = CacheController;
