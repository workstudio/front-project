import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/books'

export default class Book extends BaseModel {
  static entity = 'books'

  static fields () {
    return {
      id: this.increment(),
      name: this.string(''),
      //datas: {},
      status: this.string(''),
    }
  }

  static methodConf = conf
}
