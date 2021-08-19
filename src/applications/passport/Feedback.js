import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/passport/feedback'

export default class Feedback extends BaseModel {
  static entity = 'feedback'

  static methodConf = conf
}
