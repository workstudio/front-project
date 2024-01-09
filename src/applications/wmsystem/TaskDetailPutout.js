import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/task-detail-putouts'

export default class TaskDetailPutout extends BaseModel {
  static entity = 'taskDetailPutouts'

  static methodConf = conf
}
