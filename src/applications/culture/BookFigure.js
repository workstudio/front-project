import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/book-figures'

export default class BookFigure extends BaseModel {
  static entity = 'bookFigures'

  static methodConf = conf
}
