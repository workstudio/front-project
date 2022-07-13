import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bench/assets'

export default class Asset extends BaseModel {
  static entity = 'assets'

  static methodConf = conf
}
