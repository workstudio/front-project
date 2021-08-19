import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/paytrade/coupon-sorts'

export default class CouponSort extends BaseModel {
  static entity = 'couponSorts'

  static methodConf = conf
}
