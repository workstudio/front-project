import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bench/siteaccounts'

export default class Siteaccount extends BaseModel {
  static entity = 'siteaccounts'

  static methodConf = conf
}
