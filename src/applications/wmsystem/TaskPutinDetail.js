import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/task-putin-details'

export default class TaskPutinDetail extends BaseModel {
  static entity = 'taskPutinDetails'

  static methodConf = conf
}
