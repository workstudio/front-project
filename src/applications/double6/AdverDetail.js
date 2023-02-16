import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/adver-details'

export default class AdverDetail extends BaseModel {
  static entity = 'adverDetails'

  static methodConf = conf
}
