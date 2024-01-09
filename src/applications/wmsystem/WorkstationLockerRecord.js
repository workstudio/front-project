import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/workstation-locker-records'

export default class WorkstationLockerRecord extends BaseModel {
  static entity = 'workstationLockerRecords'

  static methodConf = conf
}
