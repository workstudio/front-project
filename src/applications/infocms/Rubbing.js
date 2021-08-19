import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/rubbings'

export default class Rubbing extends BaseModel {
  static entity = 'rubbings'

  static methodConf = conf
}
