import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/teachers'

export default class Teacher extends BaseModel {
  static entity = 'teachers'
  //static keyField = 'code'

  static methodConf = conf
}
