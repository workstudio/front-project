import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/umeng-messages'

export default class UmengMessage extends BaseModel {
  static entity = 'umengMessages'

  static methodConf = conf
}
