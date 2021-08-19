import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/paytrade/accounts'

export default class Account extends BaseModel {
  static entity = 'accounts'

  static methodConf = conf
}
