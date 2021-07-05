import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/chapter-records'

export default class ChapterRecord extends BaseModel {
  static entity = 'chapterRecords'

  static methodConf = conf
}
