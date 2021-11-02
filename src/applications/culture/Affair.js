import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/affairs'

export default class Affair extends BaseModel {
  static entity = 'affairs'

  static methodConf = conf
}
