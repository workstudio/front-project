import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/micro-headlines'

export default class MicroHeadline extends BaseModel {
  static entity = 'microHeadlines'

  static methodConf = conf
}
