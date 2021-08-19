import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bench/toolbars'

export default class Toolbar extends BaseModel {
  static entity = 'toolbars'

  static methodConf = conf
}
