import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/process-templates'

export default class ProcessTemplate extends BaseModel {
  static entity = 'processTemplates'

  static methodConf = conf
}
