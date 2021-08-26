import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/passport/faqs'

export default class Faq extends BaseModel {
  static entity = 'faqs'

  static methodConf = conf
}
