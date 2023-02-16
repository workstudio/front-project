import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/section-records'

export default class SectionRecord extends BaseModel {
  static entity = 'sectionRecords'
  //static keyField = 'code'

  static methodConf = conf
}
