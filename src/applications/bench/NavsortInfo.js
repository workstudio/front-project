import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bench/navsort-infos'

export default class NavsortInfo extends BaseModel {
  static entity = 'navsortInfos'

  static methodConf = conf
}
