import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/goods'

export default class Goods extends BaseModel {
  static entity = 'bigdataGoods'

  static methodConf = conf
}
