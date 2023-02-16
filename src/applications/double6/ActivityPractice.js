import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/activity-practices'

export default class ActivityPractice extends BaseModel {
  static entity = 'activityPractices'

  static methodConf = conf
}
