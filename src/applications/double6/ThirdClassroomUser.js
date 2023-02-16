import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/third-classroom-users'

export default class ThirdClassroomUser extends BaseModel {
  static entity = 'thirdClassroomUsers'

  static methodConf = conf
}
