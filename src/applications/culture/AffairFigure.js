import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/affair-figures'

export default class AffairFigure extends BaseModel {
  static entity = 'affairFigures'

  static methodConf = conf
}
