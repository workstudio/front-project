import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/attachments'

export default class Attachment extends BaseModel {
  static entity = 'infocmsAttachments'

  static methodConf = conf
}
