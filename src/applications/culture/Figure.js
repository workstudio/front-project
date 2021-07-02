import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture_figure'

export default class Figure extends BaseModel {
  static entity = 'figures'

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
