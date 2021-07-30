import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/websites'

export default class Website extends BaseModel {
  static entity = 'bigdataWebsites'

  static methodConf = conf
}
