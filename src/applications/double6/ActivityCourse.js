import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/activity-courses'

export default class ActivityCourse extends BaseModel {
  static entity = 'activityCourses'

  static methodConf = conf
}
