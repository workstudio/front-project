import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/scholarisms'

export default class Scholarism extends BaseModel {
  static entity = 'scholarisms'

  static methodConf = conf
}
