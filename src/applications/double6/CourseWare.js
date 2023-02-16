import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/course-wares'

export default class CourseWare extends BaseModel {
  static entity = 'courseWares'

  static methodConf = conf
}
