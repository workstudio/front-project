import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/receive-error-records'

export default class ReceiveErrorRecord extends BaseModel {
  static entity = 'receiveErrorRecords'

  static methodConf = conf
}
