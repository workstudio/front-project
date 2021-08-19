import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bench/toolsorts'

export default class Toolsort extends BaseModel {
  static entity = 'toolsorts'

  static methodConf = conf
}
