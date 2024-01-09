import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/workstations'

export default class Workstation extends BaseModel {
  static entity = 'workstations'

  static methodConf = conf
}
