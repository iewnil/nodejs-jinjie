/*
 * @Description: 
 * @Date: 2021-05-10 00:57:43
 * @LastEditTime: 2021-05-10 01:01:46
 * @LastEditors: linwei
 */
const { callApiServer } = require('../api');

let contentService;

class ContentService {
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

module.exports = () => {
  if(!contentService) {
    contentService = new ContentService();
  }
  return contentService;
};