import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/video-sections'

export default class VideoSection extends BaseModel {
  static entity = 'videoSections'

  static methodConf = conf
}
