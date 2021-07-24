import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/order-goods'

export default class OrderGoods extends BaseModel {
  static entity = 'bigdataOrderGoods'

  static methodConf = conf
}
