import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/invitation-records'

export default class InvitationRecord extends BaseModel {
  static entity = 'invitationRecords'

  static methodConf = conf
}
