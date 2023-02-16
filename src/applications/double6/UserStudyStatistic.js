import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/user-study-statistics'

export default class UserStudyStatistic extends BaseModel {
  static entity = 'userStudyStatistics'

  static methodConf = conf
}
