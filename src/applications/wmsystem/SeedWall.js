import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/seed-walls'

export default class SeedWall extends BaseModel {
  static entity = 'seedWalls'

  static methodConf = conf
}
