import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/passport/managers'

export default class Manager extends BaseModel {
  static entity = 'managers'

  static methodConf = conf
}
