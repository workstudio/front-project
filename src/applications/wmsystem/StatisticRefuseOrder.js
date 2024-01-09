import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/statistic-refuse-orders'

export default class StatisticRefuseOrder extends BaseModel {
  static entity = 'statisticRefuseOrders'

  static methodConf = conf
}
