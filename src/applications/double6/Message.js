import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/messages'

export default class Message extends BaseModel {
  static entity = 'messages'

  static methodConf = conf
}
