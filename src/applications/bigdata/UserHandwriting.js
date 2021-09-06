import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/user-handwritings'

export default class UserHandwriting extends BaseModel {
  static entity = 'userHandwritings'

  static methodConf = conf
}
