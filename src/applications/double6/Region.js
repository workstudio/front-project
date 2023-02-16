import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/regions'

export default class Region extends BaseModel {
  static entity = 'regions'
  static keyField = 'code'

  static methodConf = conf
}
