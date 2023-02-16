import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/device-records'

export default class DeviceRecord extends BaseModel {
  static entity = 'deviceRecords'

  static methodConf = conf
}
