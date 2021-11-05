import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/book-sorts'

export default class BookSort extends BaseModel {
  static entity = 'bookSorts'
  static keyField = 'code'

  static methodConf = conf
}
