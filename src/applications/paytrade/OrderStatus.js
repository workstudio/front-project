import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/paytrade/order-statuses'

export default class OrderStatus extends BaseModel {
  static entity = 'orderStatuses'

  static methodConf = conf
}
