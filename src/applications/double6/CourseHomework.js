import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/course-homeworks'

export default class CourseHomework extends BaseModel {
  static entity = 'courseHomeworks'

  static methodConf = conf
}
