import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/products'

export default class Product extends BaseModel {
  static entity = 'products'

  static methodConf = conf
}
