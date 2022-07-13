import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bench/pages'

export default class Page extends BaseModel {
  static entity = 'pages'

  static methodConf = conf
}
