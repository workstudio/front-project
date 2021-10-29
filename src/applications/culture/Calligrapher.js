import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/calligraphers'

export default class Calligrapher extends BaseModel {
  static entity = 'calligraphers'

  static methodConf = conf
}
