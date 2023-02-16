import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/broadcast-backs'

export default class BroadcastBack extends BaseModel {
  static entity = 'broadcastBacks'

  static methodConf = conf
}
