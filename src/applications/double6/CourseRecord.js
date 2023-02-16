import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/course-records'

export default class CourseRecord extends BaseModel {
  static entity = 'courseRecords'
  //static keyField = 'code'

  static methodConf = conf
}
