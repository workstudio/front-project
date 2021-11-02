import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/dateinfos'

export default class Dateinfo extends BaseModel {
  static entity = 'dateinfos'

  static methodConf = conf
}
