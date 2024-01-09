import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/heat-types'

export default class HeatType extends BaseModel {
  static entity = 'heatTypes'

  static methodConf = conf
}
