/*
 * @Description:  封装 mongodb api
 * @Date: 2021-05-08 18:08:32
 * @LastEditTime: 2021-05-08 18:19:31
 * @LastEditors: linwei
 */

const uri = 'mongodb://localhost:27017';
const MongoClient = require('mongodb').MongoClient;

let baseMongodb;

class BaseMongodb {
  constructor() {
    this.mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    this.mongoClient.connect(err => {
      if(err){
        console.log('connect db error', err);
        return;
      }
      this.client = this.mongoClient;
    });
  }

  async getClient() {
    if(!this.client) {
      this.client = await this.mongoClient.connect();
    }
    return this.client;
  }
}

module.exports = () => {
  if(!baseMongodb){
    baseMongodb = new BaseMongodb();
  }
  return baseMongodb;
}