/*
 * @Description: 
 * @Date: 2021-05-09 17:42:09
 * @LastEditTime: 2021-05-10 01:02:55
 * @LastEditors: linwei
 */
const Controller = require('../core/controller');
const ContentModel = require('../model/content');
const contentService = require('../service/content')();

class ContentController extends Controller{

  constructor(req, res) {
    super(req, res);
  }
  
  async queryContent() {
    let contents = await new ContentModel().queryData({},{limit: 10});
    contents = await contentService.getUserInfo(contents);
    console.log('content',contents);
    
    return this.setResInfo(true, 'success', contents);
  }

}

module.exports = ContentController;