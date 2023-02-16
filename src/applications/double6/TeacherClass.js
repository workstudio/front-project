import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/teacher-classes'

export default class TeacherClass extends BaseModel {
  static entity = 'teacherClasses'
  //static keyField = 'code'

  static methodConf = conf
}
