import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/task-records'

export default class TaskRecord extends BaseModel {
  static entity = 'taskRecords'

  static methodConf = conf
}
