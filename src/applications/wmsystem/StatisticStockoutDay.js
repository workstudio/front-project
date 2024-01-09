import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/statistic-stockout-days'

export default class OrderInventory extends BaseModel {
  static entity = 'statisticStockoutDays'

  static methodConf = conf
}
