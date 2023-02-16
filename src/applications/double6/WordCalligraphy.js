import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/word-calligraphies'

export default class WordCalligraphy extends BaseModel {
  static entity = 'wordCalligraphys'
  //static keyField = 'code'

  static methodConf = conf
}
