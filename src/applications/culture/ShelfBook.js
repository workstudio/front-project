import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/shelf-books'

export default class ShelfBook extends BaseModel {
  static entity = 'shelfBooks'

  static methodConf = conf
}
