import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/homework-practices'

export default class HomeworkPractice extends BaseModel {
  static entity = 'homeworkPractices'

  static methodConf = conf
}
