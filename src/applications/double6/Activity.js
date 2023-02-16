import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/activities'

export default class Activity extends BaseModel {
  static entity = 'activities'

  static methodConf = conf
}
