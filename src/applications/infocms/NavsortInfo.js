import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/navsort-infos'

export default class NavsortInfo extends BaseModel {
  static entity = 'infocmsNavsortInfos'

  static methodConf = conf
}
