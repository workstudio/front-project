import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/practice-games'

export default class PracticeGame extends BaseModel {
  static entity = 'practiceGames'

  static methodConf = conf
}
