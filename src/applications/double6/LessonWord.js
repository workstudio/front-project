import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/lesson-words'

export default class LessonWord extends BaseModel {
  static entity = 'lessonWords'

  static methodConf = conf
}
