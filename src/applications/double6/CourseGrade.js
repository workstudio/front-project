import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/course-grades'

export default class CourseGrade extends BaseModel {
  static entity = 'courseGrades'

  static methodConf = conf
}
