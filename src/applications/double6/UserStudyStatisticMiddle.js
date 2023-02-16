import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/user-study-statistic-middles'

export default class UserStudyStatisticMiddle extends BaseModel {
  static entity = 'userStudyStatisticMiddles'

  static methodConf = conf
}
