import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/shops'

export default class Shop extends BaseModel {
  static entity = 'shops'

  static methodConf = conf
}
