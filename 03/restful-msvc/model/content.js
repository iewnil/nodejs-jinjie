/*
 * @Description: 
 * @Date: 2021-05-08 21:50:31
 * @LastEditTime: 2021-05-09 17:41:40
 * @LastEditors: linwei
 */
const Model = require('../core/model');

class ContentModel extends Model {
  
  constructor() {
    super();
    this.collectionName = 'content';
  }
  
  async queryData (queryOption) {
    const collection = await this.getCollection(this.collectionName);
    const data = collection.find(queryOption).toArray();

    return data;
  }

}

module.exports = ContentModel;