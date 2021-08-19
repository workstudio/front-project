import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/paytrade/order-expresses'

export default class OrderExpress extends BaseModel {
  static entity = 'orderExpresses'

  static methodConf = conf
}
