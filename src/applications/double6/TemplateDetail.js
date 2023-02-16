import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/template-details'

export default class TemplateDetail extends BaseModel {
  static entity = 'templateDetails'

  static methodConf = conf
}
