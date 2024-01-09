import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/seed-wall-materials'

export default class SeedWallMaterial extends BaseModel {
  static entity = 'seedWallMaterials'

  static methodConf = conf
}
