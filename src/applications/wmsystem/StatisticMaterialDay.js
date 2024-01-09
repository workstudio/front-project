import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/statistic-material-days'

export default class StatisticMaterialDay extends BaseModel {
  static entity = 'statisticMaterialDays'

  static methodConf = conf
}
