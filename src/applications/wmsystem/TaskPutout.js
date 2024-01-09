import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/task-putouts'

export default class TaskPutout extends BaseModel {
  static entity = 'taskPutouts'

  static methodConf = conf
}
