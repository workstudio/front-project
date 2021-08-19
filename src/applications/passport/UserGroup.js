import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/passport/user-groups'

export default class UserGroup extends BaseModel {
  static entity = 'userGroups'

  static methodConf = conf
}
