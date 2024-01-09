import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/workstation-pick-records'

export default class WorkstationPickRecord extends BaseModel {
  static entity = 'workstationPickRecords'

  static methodConf = conf
}
