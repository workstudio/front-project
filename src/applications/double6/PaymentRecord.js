import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/payment-records'

export default class PaymentRecord extends BaseModel {
  static entity = 'payment-records'

  static methodConf = conf
}
