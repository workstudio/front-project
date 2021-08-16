import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/order-infos'

export default class OrderInfo extends BaseModel {
  static entity = 'bigdataOrderInfos'

  static methodConf = conf
}
