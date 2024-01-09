import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/order-putin-materials'

export default class OrderPutinMaterial extends BaseModel {
  static entity = 'orderPutinMaterials'

  static methodConf = conf
}
