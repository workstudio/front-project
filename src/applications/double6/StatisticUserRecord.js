import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/statistic-user-records'

export default class StatisticUserRecord extends BaseModel {
  static entity = 'statisticUserRecords'
  //static keyField = 'code'

  static methodConf = conf
}
