import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/tags'

export default class Tag extends BaseModel {
  static entity = 'cultureTags'

  static methodConf = conf
}
