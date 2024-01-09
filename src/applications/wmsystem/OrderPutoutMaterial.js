import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/order-putout-materials'

export default class OrderPutoutMaterial extends BaseModel {
  static entity = 'orderPutoutMaterials'

  static methodConf = conf
}
