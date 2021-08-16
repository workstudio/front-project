import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/user-addresses'

export default class UserAddress extends BaseModel {
  static entity = 'bigdataUserAddresses'

  static methodConf = conf
}
