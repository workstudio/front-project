import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bench/commonlists'

export default class Commonlist extends BaseModel {
  static entity = 'commonlists'

  static methodConf = conf
}
