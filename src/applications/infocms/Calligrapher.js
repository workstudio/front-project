import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/calligraphers'

export default class Calligrapher extends BaseModel {
  static entity = 'calligraphers'

  static methodConf = conf
}
