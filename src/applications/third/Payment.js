import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/third/payments'

export default class Payment extends BaseModel {
  static entity = 'payments'

  static methodConf = conf
}
