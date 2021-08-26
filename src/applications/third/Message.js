import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/third/messages'

export default class Message extends BaseModel {
  static entity = 'messages'

  static methodConf = conf
}
