import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/user-course-studies'

export default class UserCourseStudy extends BaseModel {
  static entity = 'userCourseStudies'

  static methodConf = conf
}
