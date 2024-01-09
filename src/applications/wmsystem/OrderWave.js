import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/order-waves'

export default class OrderWave extends BaseModel {
  static entity = 'orderWaves'

  static methodConf = conf
}
