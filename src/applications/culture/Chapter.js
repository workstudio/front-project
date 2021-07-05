import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/chapters'

export default class Chapter extends BaseModel {
  static entity = 'chapters'

  static methodConf = conf
}
