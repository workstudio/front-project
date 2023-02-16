import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/course-ware-grades'

export default class CourseWareGrade extends BaseModel {
  static entity = 'courseWareGrades'

  static methodConf = conf
}
