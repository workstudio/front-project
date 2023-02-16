import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/coin-records'

export default class CoinRecord extends BaseModel {
  static entity = 'coinRecords'

  static methodConf = conf
}
