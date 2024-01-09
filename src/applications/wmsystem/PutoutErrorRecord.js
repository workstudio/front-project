import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/putout-error-records'

export default class PutoutErrorRecord extends BaseModel {
  static entity = 'putoutErrorRecords'

  static methodConf = conf
}
