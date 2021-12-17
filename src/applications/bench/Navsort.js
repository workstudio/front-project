import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bench/navsorts'

export default class Navsort extends BaseModel {
  static entity = 'navsorts'

  static methodConf = conf
}
