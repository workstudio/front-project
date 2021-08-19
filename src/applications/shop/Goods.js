import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/shop/goods'

export default class Goods extends BaseModel {
  static entity = 'goods'

  static methodConf = conf
}
