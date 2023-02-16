import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/word-systems'

export default class WordSystem extends BaseModel {
  static entity = 'wordSystems'
  //static keyField = 'code'

  static methodConf = conf
}
