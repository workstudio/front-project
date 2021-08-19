import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/third/qrcodes'

export default class Qrcode extends BaseModel {
  static entity = 'qrcodes'

  static methodConf = conf
}
