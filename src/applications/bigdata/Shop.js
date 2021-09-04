import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/shopes'

export default class Shop extends BaseModel {
  static entity = 'bigdataShops'

  static methodConf = conf
}
