import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/third/template-records'

export default class TemplateRecord extends BaseModel {
  static entity = 'templateRecords'

  static methodConf = conf
}
