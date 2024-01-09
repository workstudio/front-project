import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/lockers'

export default class Locker extends BaseModel {
  static entity = 'lockers'

  static methodConf = conf
}
