import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/third/user-plats'

export default class UserPlat extends BaseModel {
  static entity = 'userPlats'

  static methodConf = conf
}
