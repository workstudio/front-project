import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/sync-courses'

export default class SyncCourse extends BaseModel {
  static entity = 'syncCourses'

  static methodConf = conf
}
