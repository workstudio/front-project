import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/paytrade/user-preferentials'

export default class UserPreferential extends BaseModel {
  static entity = 'userPreferentials'

  static methodConf = conf
}
