import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/statistic-putinout-records'

export default class StatisticPutinoutRecord extends BaseModel {
  static entity = 'statisticPutinoutRecords'

  static methodConf = conf
}
