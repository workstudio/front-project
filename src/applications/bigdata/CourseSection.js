import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/course-sections'

export default class CourseSection extends BaseModel {
  static entity = 'courseSections'

  static methodConf = conf
}
