import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/passport/user-addresses'

export default class UserAddress extends BaseModel {
  static entity = 'userAddresses'

  static methodConf = conf
}
