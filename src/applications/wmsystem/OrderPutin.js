import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/order-putins'

export default class OrderPutin extends BaseModel {
  static entity = 'orderPutins'

  static methodConf = conf
}
