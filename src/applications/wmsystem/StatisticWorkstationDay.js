import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/statistic-workstation-days'

export default class StatisticWorkstationDay extends BaseModel {
  static entity = 'statisticWorkstationDays'

  static methodConf = conf
}
