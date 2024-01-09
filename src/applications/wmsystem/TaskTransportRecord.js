import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/task-transport-records'

export default class TaskTransportRecord extends BaseModel {
  static entity = 'taskTransportRecords'

  static methodConf = conf
}
