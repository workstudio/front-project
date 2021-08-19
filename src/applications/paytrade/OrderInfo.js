import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/paytrade/order-infos'

export default class OrderInfo extends BaseModel {
  static entity = 'orderInfos'

  static methodConf = conf
}
