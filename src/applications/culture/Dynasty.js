import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/dynasties'

export default class Dynasty extends BaseModel {
  static entity = 'dynasties'

  static methodConf = conf
}
