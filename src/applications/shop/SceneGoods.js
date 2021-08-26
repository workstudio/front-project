import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/shop/scene-goods'

export default class SceneGoods extends BaseModel {
  static entity = 'sceneGoods'

  static methodConf = conf
}
