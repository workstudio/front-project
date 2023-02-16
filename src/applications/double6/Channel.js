import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/channels'

export default class Channel extends BaseModel {
  static entity = 'channels'

  static methodConf = conf
}
