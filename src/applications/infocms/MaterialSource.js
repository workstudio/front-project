import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/material-sources'

export default class MaterialSource extends BaseModel {
  static entity = 'materialSources'

  static methodConf = conf
}
