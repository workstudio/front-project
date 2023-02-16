import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/broadcast-classrooms'

export default class BroadcastClassroom extends BaseModel {
  static entity = 'broadcastClassrooms'

  static methodConf = conf
}
