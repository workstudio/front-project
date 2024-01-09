import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/task-enventories'

export default class TaskEnventory extends BaseModel {
  static entity = 'taskEnventories'

  static methodConf = conf
}
