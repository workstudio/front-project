import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/payment-accounts'

export default class PaymentAccount extends BaseModel {
  static entity = 'paymentAccounts'

  static methodConf = conf
}
