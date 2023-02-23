import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/positions'

export default class Position extends BaseModel {
  static entity = 'positions'
  static keyField = 'code'

  static methodConf = conf
}
