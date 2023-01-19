import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bench/websites'

export default class BenchWebsite extends BaseModel {
  static entity = 'benchWebsites'

  static methodConf = conf
}
