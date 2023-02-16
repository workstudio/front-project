import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/third-classrooms'

export default class ThirdClassroom extends BaseModel {
  static entity = 'thirdClassrooms'

  static methodConf = conf
}
