import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/payment-order-goods'

export default class PaymentOrderGoods extends BaseModel {
  static entity = 'payment-order-goods'

  static methodConf = conf
}
