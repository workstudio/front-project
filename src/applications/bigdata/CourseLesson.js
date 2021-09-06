import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/course-lessons'

export default class CourseLesson extends BaseModel {
  static entity = 'courseLessons'

  static methodConf = conf
}
