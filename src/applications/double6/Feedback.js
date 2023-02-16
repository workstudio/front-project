import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/feedback'

export default class Feedback extends BaseModel {
  static entity = 'feedback'

  static methodConf = conf
}
