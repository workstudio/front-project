import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/shelves'

export default class Shelf extends BaseModel {
  static entity = 'shelves'

  static methodConf = conf
}
