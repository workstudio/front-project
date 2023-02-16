import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/user-excellents'

export default class UserExcellent extends BaseModel {
  static entity = 'userExcellents'

  static methodConf = conf
}
