import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/third/materials'

export default class Material extends BaseModel {
  static entity = 'materials'

  static methodConf = conf
}
