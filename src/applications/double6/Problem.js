import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/problems'

export default class Problem extends BaseModel {
  static entity = 'problems'

  static methodConf = conf
}
