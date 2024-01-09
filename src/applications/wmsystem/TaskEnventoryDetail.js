import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/task-enventory-details'

export default class TaskEnventoryDetail extends BaseModel {
  static entity = 'taskEnventoryDetails'

  static methodConf = conf
}
