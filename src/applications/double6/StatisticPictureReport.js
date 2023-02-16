import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/statistic-picture-reports'

export default class StatisticPictureReport extends BaseModel {
  static entity = 'statisticPictureReports'
  //static keyField = 'code'

  static methodConf = conf
}
