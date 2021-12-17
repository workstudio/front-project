import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/diagrams'

export default class Diagram extends BaseModel {
  static entity = 'diagrams'

  static methodConf = conf
}
