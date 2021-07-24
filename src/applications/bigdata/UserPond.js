import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/user-ponds'

export default class UserPond extends BaseModel {
  static entity = 'userPonds'

  static methodConf = conf
}
