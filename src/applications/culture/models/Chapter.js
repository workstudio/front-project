import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture_chapter'

export default class Chapter extends BaseModel {
  static entity = 'chapters'

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
