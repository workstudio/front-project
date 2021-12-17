import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bench/position-infos'

export default class PositionInfo extends BaseModel {
  static entity = 'positionInfos'

  static methodConf = conf
}
