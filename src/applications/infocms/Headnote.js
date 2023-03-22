import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/headnotes'

export default class Headnote extends BaseModel {
  static entity = 'headnotes'

  static methodConf = conf
}
