import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/tags'

export default class Tag extends BaseModel {
  static entity = 'tags'

  static methodConf = conf
}
