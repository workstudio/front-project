import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/passport/groups'

export default class Group extends BaseModel {
  static entity = 'groups'

  static methodConf = conf
}
