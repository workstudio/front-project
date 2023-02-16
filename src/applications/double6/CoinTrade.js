import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/coin-trades'

export default class CoinTrade extends BaseModel {
  static entity = 'coinTrades'

  static methodConf = conf
}
