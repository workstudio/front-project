import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/third/auto-replies'

export default class AutoReply extends BaseModel {
  static entity = 'autoReplies'

  static methodConf = conf
}
