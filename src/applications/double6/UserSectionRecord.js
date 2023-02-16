import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/user-section-records'

export default class UserSectionRecord extends BaseModel {
  static entity = 'userSectionRecords'

  static methodConf = conf
}
