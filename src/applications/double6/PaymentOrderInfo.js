import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/payment-order-infos'

export default class PaymentOrderInfo extends BaseModel {
  static entity = 'payment-order-infos'

  static methodConf = conf
}
