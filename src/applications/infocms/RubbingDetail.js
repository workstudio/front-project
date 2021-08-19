import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/rubbing-details'

export default class RubbingDetail extends BaseModel {
  static entity = 'rubbingDetails'

  static methodConf = conf
}
