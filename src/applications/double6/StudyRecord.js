import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/study-records'

export default class StudyRecord extends BaseModel {
  static entity = 'studyReocrds'
  //static keyField = 'code'

  static methodConf = conf
}
