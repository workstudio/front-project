import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/seed-wall-putouts'

export default class SeedWallPutout extends BaseModel {
  static entity = 'seedWallPutouts'

  static methodConf = conf
}
