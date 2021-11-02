import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/rubbing-words'

export default class RubbingWord extends BaseModel {
  static entity = 'rubbingWords'

  static methodConf = conf
}
