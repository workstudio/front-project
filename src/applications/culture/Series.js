import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/series'

export default class Series extends BaseModel {
  static entity = 'series'

  static methodConf = conf
}
