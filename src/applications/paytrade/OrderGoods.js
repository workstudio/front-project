import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/paytrade/order-goods'

export default class OrderGoods extends BaseModel {
  static entity = 'orderGoods'

  static methodConf = conf
}
