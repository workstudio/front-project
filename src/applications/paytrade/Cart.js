import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/paytrade/carts'

export default class Cart extends BaseModel {
  static entity = 'carts'

  static methodConf = conf
}
