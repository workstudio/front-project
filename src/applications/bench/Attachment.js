import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bench/attachments'

export default class BenchAttachment extends BaseModel {
  static entity = 'benchAttachments'

  static methodConf = conf
}
