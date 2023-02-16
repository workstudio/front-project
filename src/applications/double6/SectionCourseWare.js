import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/section-course-wares'

export default class SectionCourseWare extends BaseModel {
  static entity = 'sectionCourseWares'

  static methodConf = conf
}
