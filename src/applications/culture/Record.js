import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/records'

export default class Record extends BaseModel {
  static entity = 'records'

  static methodConf = conf
}
