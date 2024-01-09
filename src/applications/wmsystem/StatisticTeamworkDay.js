import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/statistic-teamwork-days'

export default class StatisticTeamworkDay extends BaseModel {
  static entity = 'statisticTeamworkDays'

  static methodConf = conf
}
