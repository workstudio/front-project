import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/word-points'

export default class WordPoint extends BaseModel {
  static entity = 'wordPoints'
  //static keyField = 'code'

  static methodConf = conf
}
