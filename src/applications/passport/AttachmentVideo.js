import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/passport/attachment-videos'

export default class AttachmentVideo extends BaseModel {
  static entity = 'attachmentVideos'

  static methodConf = conf
}
