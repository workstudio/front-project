import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/order-putouts'

export default class OrderPutout extends BaseModel {
  static entity = 'orderPutouts'

  static methodConf = conf
}
