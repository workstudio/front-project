import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/workstation-types'

export default class WorkstationType extends BaseModel {
  static entity = 'workstationTypes'

  static methodConf = conf
}
