import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/rubbing-words'

export default class RubbingWord extends BaseModel {
  static entity = 'rubbingWords'

  static methodConf = conf
}
