import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/teacher-courses'

export default class TeacherCourse extends BaseModel {
  static entity = 'teacherCourses'

  static methodConf = conf
}
