import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/schedulings'

export default class Scheduling extends BaseModel {
  static entity = 'schedulings'

  static methodConf = conf
}
