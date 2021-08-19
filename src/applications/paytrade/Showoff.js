import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/paytrade/showoffs'

export default class Showoff extends BaseModel {
  static entity = 'showoffs'

  static methodConf = conf
}
