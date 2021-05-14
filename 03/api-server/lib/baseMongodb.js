/*
 * @Description:  封装 mongodb API
 * @Date: 2021-05-06 23:00:11
 * @LastEditTime: 2021-05-08 09:10:10
 * @LastEditors: linwei
 */

/**
 * 封装 mongodb API
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
    })
  }

  async getClient() {
    if(!this.client) {
      this.client = await this.mongoClient.connect();
    }
    return this.client;
  }
}

module.exports = function() {
  if(!baseMongodb) {
    baseMongodb = new BaseMongodb();
  }
  return baseMongodb;
}

