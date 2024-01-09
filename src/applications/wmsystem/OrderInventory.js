import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/order-inventories'

export default class OrderInventory extends BaseModel {
  static entity = 'orderInventories'

  static methodConf = conf
}
