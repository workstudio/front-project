import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/task-detail-putins'

export default class TaskDetailPutin extends BaseModel {
  static entity = 'taskDetailPutins'

  static methodConf = conf
}
