import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/passport/managerlogs'

export default class Managerlog extends BaseModel {
  static entity = 'managerlogs'

  static methodConf = conf
}
