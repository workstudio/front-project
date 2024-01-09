import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/locker-materials'

export default class LockerMaterial extends BaseModel {
  static entity = 'lockerMaterials'

  static methodConf = conf
}
