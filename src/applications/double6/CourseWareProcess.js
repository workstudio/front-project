import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/course-ware-processes'

export default class CourseWareProcess extends BaseModel {
  static entity = 'courseWareProcesses'

  static methodConf = conf
}
