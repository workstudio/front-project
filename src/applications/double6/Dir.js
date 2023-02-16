import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/dirs'

export default class Dir extends BaseModel {
  static entity = 'dirs'

  static methodConf = conf
}
