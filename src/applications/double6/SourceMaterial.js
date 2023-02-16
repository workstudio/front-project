import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/source-materials'

export default class SourceMaterial extends BaseModel {
  static entity = 'sourceMaterials'

  static methodConf = conf
}
