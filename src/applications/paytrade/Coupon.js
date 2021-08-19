import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/paytrade/coupons'

export default class Coupon extends BaseModel {
  static entity = 'coupons'

  static methodConf = conf
}
