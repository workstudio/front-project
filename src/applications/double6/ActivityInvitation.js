import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/activity-invitations'

export default class ActivityInvitation extends BaseModel {
  static entity = 'activityInvitations'

  static methodConf = conf
}
