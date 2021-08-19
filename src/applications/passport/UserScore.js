import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/passport/user-scores'

export default class UserScore extends BaseModel {
  static entity = 'userScores'

  static methodConf = conf
}
