import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/book-publishes'

export default class BookPublish extends BaseModel {
  static entity = 'bookPublishes'

  static methodConf = conf
}
