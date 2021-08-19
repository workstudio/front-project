import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/shop/scenes'

export default class Scene extends BaseModel {
  static entity = 'scenes'

  static methodConf = conf
}
