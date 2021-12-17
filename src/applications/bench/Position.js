import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bench/positions'

export default class Position extends BaseModel {
  static entity = 'positions'

  static methodConf = conf
}
