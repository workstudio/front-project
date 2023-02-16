import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/third-week-reports'

export default class ThirdWeekReport extends BaseModel {
  static entity = 'thirdWeekReports'

  static methodConf = conf
}
