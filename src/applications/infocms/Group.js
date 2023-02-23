import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/groups'

export default class Group extends BaseModel {
  static entity = 'infocmsGroups'
  static keyField = 'code'

  static methodConf = conf
}
