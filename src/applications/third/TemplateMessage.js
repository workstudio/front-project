import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/third/template-messages'

export default class TemplateMessage extends BaseModel {
  static entity = 'templateMessages'

  static methodConf = conf
}
