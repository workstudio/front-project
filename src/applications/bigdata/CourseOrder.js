import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/course-orders'

export default class CourseOrder extends BaseModel {
  static entity = 'courseOrders'

  static methodConf = conf
}
