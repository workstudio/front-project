import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/dir-files'

export default class DirFile extends BaseModel {
  static entity = 'dirFiles'

  static methodConf = conf
}
