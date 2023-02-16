import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/teacher-auths'

export default class TeacherAuth extends BaseModel {
  static entity = 'teacherAuths'

  static methodConf = conf
}
