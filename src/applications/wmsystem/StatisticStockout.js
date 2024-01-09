import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/statistic-stockouts'

export default class StatisticStockout extends BaseModel {
  static entity = 'statisticStockouts'

  static methodConf = conf
}
