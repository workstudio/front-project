import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/shop/goods-statistics'

export default class GoodsStatistic extends BaseModel {
  static entity = 'goodsStatistics'

  static methodConf = conf
}
