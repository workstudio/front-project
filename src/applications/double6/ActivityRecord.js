import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/activity-records'

export default class ActivityRecord extends BaseModel {
  static entity = 'activityRecords'

  static methodConf = conf
}
