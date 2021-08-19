import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/shop/goods-comments'

export default class GoodsComment extends BaseModel {
  static entity = 'goodsComments'

  static methodConf = conf
}
