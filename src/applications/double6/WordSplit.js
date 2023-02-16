import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/word-splits'

export default class WordSplit extends BaseModel {
  static entity = 'wordSplits'
  //static keyField = 'code'

  static methodConf = conf
}
