import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/course-suites'

export default class CourseSuite extends BaseModel {
  static entity = 'courseSuites'

  static methodConf = conf
}
