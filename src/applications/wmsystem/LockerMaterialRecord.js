import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/locker-material-records'

export default class LockerMaterialRecord extends BaseModel {
  static entity = 'lockerMaterialRecords'

  static methodConf = conf
}
