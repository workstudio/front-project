import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/shop/goods-attributes'

export default class GoodsAttribute extends BaseModel {
  static entity = 'goodsAttributes'

  static methodConf = conf
}
