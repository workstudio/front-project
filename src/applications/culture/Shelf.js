import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/shelfs'

export default class Shelf extends BaseModel {
  static entity = 'shelfs'

  static methodConf = conf
}
