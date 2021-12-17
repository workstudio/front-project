import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bench/navigations'

export default class Navigation extends BaseModel {
  static entity = 'navigations'

  static methodConf = conf
}
