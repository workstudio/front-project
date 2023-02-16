import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/templates'

export default class Template extends BaseModel {
  static entity = 'templates'

  static methodConf = conf
}
