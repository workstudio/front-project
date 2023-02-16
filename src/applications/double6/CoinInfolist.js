import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/coin-infolists'

export default class CoinInfolist extends BaseModel {
  static entity = 'coinInfolists'

  static methodConf = conf
}
