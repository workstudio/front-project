import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/user-paytrades'

export default class UserPaytrade extends BaseModel {
  static entity = 'bigdataUserPaytrades'

  static methodConf = conf
}
