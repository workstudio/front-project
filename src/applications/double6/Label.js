import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/labels'

export default class Label extends BaseModel {
  static entity = 'labels'

  static methodConf = conf
}
