import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/statistic-inventory-days'

export default class StatisticInventoryDay extends BaseModel {
  static entity = 'statisticInventoryDays'

  static methodConf = conf
}
