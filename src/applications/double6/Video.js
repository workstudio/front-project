import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/videos'

export default class Video extends BaseModel {
  static entity = 'videos'

  static methodConf = conf
}
