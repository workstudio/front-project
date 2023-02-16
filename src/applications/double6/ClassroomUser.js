import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/classroom-users'

export default class ClassroomUser extends BaseModel {
  static entity = 'classroomUsers'
  //static keyField = 'code'

  static methodConf = conf
}
