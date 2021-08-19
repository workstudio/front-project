import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/knowledge'

export default class Knowledge extends BaseModel {
  static entity = 'knowledge'

  static methodConf = conf
}
