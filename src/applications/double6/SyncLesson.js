import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/sync-lessons'

export default class SyncLesson extends BaseModel {
  static entity = 'syncLessons'

  static methodConf = conf
}
