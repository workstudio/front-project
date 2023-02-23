import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/navsorts'

export default class Navsort extends BaseModel {
  static entity = 'infocmsNavsorts'
  static keyField = 'code'

  static methodConf = conf
}
