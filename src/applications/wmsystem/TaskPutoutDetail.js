import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/task-putout-details'

export default class TaskPutoutDetail extends BaseModel {
  static entity = 'taskPutoutDetails'

  static methodConf = conf
}
