import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/statistic-pick-records'

export default class StatisticPickRecord extends BaseModel {
  static entity = 'statisticPickRecords'

  static methodConf = conf
}
