import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bench/commoninfos'

export default class Commoninfo extends BaseModel {
  static entity = 'commoninfos'

  static methodConf = conf
}
