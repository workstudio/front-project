import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/homework'

export default class Homework extends BaseModel {
  static entity = 'homework'

  static methodConf = conf
}
