import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/course-suite-orders'

export default class CourseSuiteOrder extends BaseModel {
  static entity = 'courseSuiteOrders'

  static methodConf = conf
}
