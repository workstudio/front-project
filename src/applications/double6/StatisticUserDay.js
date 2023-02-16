import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/statistic-user-days'

export default class StatisticUserDay extends BaseModel {
  static entity = 'statisticUserDays'
  //static keyField = 'code'

  static methodConf = conf
}
