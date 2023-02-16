import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/practice-records'

export default class PracticeRecord extends BaseModel {
  static entity = 'practiceRecords'

  static methodConf = conf
}
