import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/user-courses'

export default class UserCourse extends BaseModel {
  static entity = 'userCourses'
  //static keyField = 'code'

  static methodConf = conf
}
