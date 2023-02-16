import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/activity-joins'

export default class ActivityJoin extends BaseModel {
  static entity = 'activityJoins'

  static methodConf = conf
}
