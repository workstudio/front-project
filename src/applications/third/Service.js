import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/third/services'

export default class Service extends BaseModel {
  static entity = 'services'

  static methodConf = conf
}
