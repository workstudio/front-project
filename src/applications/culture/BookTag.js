import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture_tag'

export default class BookTag extends BaseModel {
  static entity = 'bookTags'

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
