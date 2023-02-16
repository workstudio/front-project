import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/courses'

export default class Course extends BaseModel {
  static entity = 'courses'

  static methodConf = conf
}
