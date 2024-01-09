import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/locker-heat-types'

export default class LockerHeatType extends BaseModel {
  static entity = 'lockerHeatTypes'

  static methodConf = conf
}
