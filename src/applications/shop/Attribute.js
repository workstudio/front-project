import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/shop/attributes'

export default class Attribute extends BaseModel {
  static entity = 'attributes'

  static methodConf = conf
}
