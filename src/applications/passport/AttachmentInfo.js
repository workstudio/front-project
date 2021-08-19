import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/passport/attachment-infos'

export default class AttachmentInfo extends BaseModel {
  static entity = 'attachmentInfos'

  static methodConf = conf
}
