import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/user-name-records'

export default class UserNameRecord extends BaseModel {
  static entity = 'userNameRecords'

  static methodConf = conf
}
