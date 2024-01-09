import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/teamworks'

export default class Teamwork extends BaseModel {
  static entity = 'teamworks'

  static methodConf = conf
}
