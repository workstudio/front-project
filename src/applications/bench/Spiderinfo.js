import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bench/spiderinfos'

export default class Spiderinfo extends BaseModel {
  static entity = 'spiderinfos'

  static methodConf = conf
}
