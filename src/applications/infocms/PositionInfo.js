import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/position-infos'

export default class PositionInfo extends BaseModel {
  static entity = 'positionInfos'

  static methodConf = conf
}
