import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/lesson-dictations'

export default class LessonDictation extends BaseModel {
  static entity = 'lessonDictations'

  static methodConf = conf
}
