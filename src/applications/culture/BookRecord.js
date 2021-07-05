import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/book-records'

export default class BookRecord extends BaseModel {
  static entity = 'bookRecords'

  static methodConf = conf
}
