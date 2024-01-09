import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/statistic-stockout-day-workstations'

export default class StatisticStockoutDayWorkstation extends BaseModel {
  static entity = 'statisticStockoutDayWorkstations'

  static methodConf = conf
}
