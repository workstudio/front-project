import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/versions'

export default class Version extends BaseModel {
  static entity = 'versions'

  static methodConf = conf
}
