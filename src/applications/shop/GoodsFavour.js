import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/shop/goods-favours'

export default class GoodsFavour extends BaseModel {
  static entity = 'goodsFavours'

  static methodConf = conf
}
