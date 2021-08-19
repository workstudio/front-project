import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/paytrade/user-paytrades'

export default class UserPaytrade extends BaseModel {
  static entity = 'userPaytrades'

  static methodConf = conf
}
