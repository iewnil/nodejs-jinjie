/*
 * @Description: 
 * @Date: 2021-05-08 21:26:22
 * @LastEditTime: 2021-05-08 21:48:52
 * @LastEditors: linwei
 */
const baseMongodb = require('../core/baseMongodb')();

class Model {

  constructor() {
    this.db = 'nodejs_dev_db'
    this.baseMongodb = baseMongodb;
  }

  async getCollection(collectionName) {
    const client = await this.baseMongodb.getClient();
    const collection = client.db(this.db).collection(collectionName);
    return collection;
  }
}

module.exports = Model;