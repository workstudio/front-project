import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/task-details'

export default class TaskDetail extends BaseModel {
  static entity = 'taskDetails'

  static methodConf = conf
}
