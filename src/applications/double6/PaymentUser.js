import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/payment-users'

export default class PaymentUser extends BaseModel {
  static entity = 'payment-users'

  static methodConf = conf
}
