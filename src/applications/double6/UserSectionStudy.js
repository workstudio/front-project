import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/user-section-studies'

export default class UserSectionStudy extends BaseModel {
  static entity = 'userSectionStudies'

  static methodConf = conf
}
