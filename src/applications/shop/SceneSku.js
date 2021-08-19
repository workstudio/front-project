import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/shop/scene-skus'

export default class SceneSku extends BaseModel {
  static entity = 'sceneSkus'

  static methodConf = conf
}
