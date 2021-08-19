import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/paytrade/order-addresses'

export default class OrderAddress extends BaseModel {
  static entity = 'orderAddresses'

  static methodConf = conf
}
