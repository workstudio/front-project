import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/third/message-datas'

export default class MessageData extends BaseModel {
  static entity = 'messageDatas'

  static methodConf = conf
}
