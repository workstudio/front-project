import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/paytrade/order-afters'

export default class OrderAfter extends BaseModel {
  static entity = 'orderAfters'

  static methodConf = conf
}
