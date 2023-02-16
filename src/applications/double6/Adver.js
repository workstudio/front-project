import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/advers'

export default class Adver extends BaseModel {
  static entity = 'advers'

  static methodConf = conf
}
