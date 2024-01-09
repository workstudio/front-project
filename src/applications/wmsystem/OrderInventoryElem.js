import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/order-inventory-elems'

export default class OrderInventoryElem extends BaseModel {
  static entity = 'orderInventoryElems'

  static methodConf = conf
}
