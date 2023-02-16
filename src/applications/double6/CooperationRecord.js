import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/cooperation-records'

export default class CooperationRecord extends BaseModel {
  static entity = 'cooperationRecords'

  static methodConf = conf
}
