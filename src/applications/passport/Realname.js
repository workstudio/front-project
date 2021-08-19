import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/passport/realnames'

export default class Realname extends BaseModel {
  static entity = 'realnames'

  static methodConf = conf
}
