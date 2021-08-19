import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/paytrade/pay-records'

export default class PayRecord extends BaseModel {
  static entity = 'payRecords'

  static methodConf = conf
}
