import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/processes'

export default class Process extends BaseModel {
  static entity = 'processes'

  static methodConf = conf
}
