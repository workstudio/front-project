import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/books'

export default class Book extends BaseModel {
  static entity = 'books'
  static keyField = 'code'

  static methodConf = conf
}
