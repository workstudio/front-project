import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/statistic-picture-users'

export default class StatisticPictureUser extends BaseModel {
  static entity = 'statisticPictureUsers'
  //static keyField = 'code'

  static methodConf = conf
}
