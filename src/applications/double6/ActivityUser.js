import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/activity-users'

export default class ActivityUser extends BaseModel {
  static entity = 'activityUsers'

  static methodConf = conf
}
