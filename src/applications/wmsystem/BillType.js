import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/bill-types'

export default class BillType extends BaseModel {
  static entity = 'billTypes'

  static methodConf = conf
}
