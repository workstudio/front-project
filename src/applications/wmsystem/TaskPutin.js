import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/task-putins'

export default class TaskPutin extends BaseModel {
  static entity = 'taskPutins'

  static methodConf = conf
}
