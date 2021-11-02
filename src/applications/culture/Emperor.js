import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/emperors'

export default class Emperor extends BaseModel {
  static entity = 'emperors'

  static methodConf = conf
}
