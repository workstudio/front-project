import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/statistic-picture-report-users'

export default class StatisticPictureReportUser extends BaseModel {
  static entity = 'statisticPictureReportUsers'
  //static keyField = 'code'

  static methodConf = conf
}
