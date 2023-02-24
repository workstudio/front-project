import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/group-subjects'

export default class GroupSubject extends BaseModel {
  static entity = 'groupSubjects'

  static methodConf = conf
}
