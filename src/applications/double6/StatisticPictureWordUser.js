import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/statistic-picture-word-users'

export default class StatisticPictureWordUser extends BaseModel {
  static entity = 'statisticPictureWordUsers'
  //static keyField = 'code'

  static methodConf = conf
}
