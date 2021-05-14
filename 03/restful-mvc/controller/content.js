/*
 * @Description: 
 * @Date: 2021-05-09 17:42:09
 * @LastEditTime: 2021-05-09 18:18:26
 * @LastEditors: linwei
 */
const Controller = require('../core/controller');
const { callApiServer } = require('../api');
const ContentModel = require('../model/content');

class ContentController extends Controller{

  constructor(req, res) {
    super(req, res);
  }
  
  async queryContent() {
    let contents = await new ContentModel().queryData({},{limit: 10});
    contents = await this.getUserInfo(contents);
    console.log('content',contents);
    
    return this.setResInfo(true, 'success', contents);
  }

  async getUserInfo(contents) {
    let userIds = [];
    contents.forEach(content => {
      if(content.userId) {
        userIds.push(content.userId);
      }
    })
    if(userIds.length < 1){
      return this.addUserInfo(contents);
    }
  
    let userInfos = await callApiServer('http://127.0.0.1:5000/v1/userinfos',userIds.join(','));
    if(!userInfos || userInfos.length < 1){
      return this.addUserInfo(contents);
    }
  
    let mapUserInfo = {};
    userInfos.forEach(item => {
      if(userIds.includes(item.id)){
        mapUserInfo[Number(item.id)] = item;
      }
    })
  
    console.log(mapUserInfo);
  
    return this.addUserInfo(contents, mapUserInfo);
  }
  
  /**
 * 
 * @desc 在 content 中增加 userinfo
 * @param {*} contents 
 * @param {*} userinfo 
 */
  addUserInfo(contents, mapUserinfo={}) {
    contents = contents.map(content => {
        content.userInfo = mapUserinfo[content.userId] ? mapUserinfo[content.userId] : {};
        return content;
    });
    return contents;
  }

}

module.exports = ContentController;