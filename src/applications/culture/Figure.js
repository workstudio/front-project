import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/figures'

export default class Figure extends BaseModel {
  static entity = 'figures'
  static keyField = 'code'

  static methodConf = conf
}
