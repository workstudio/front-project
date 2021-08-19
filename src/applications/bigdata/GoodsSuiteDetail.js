import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/goods-suite-details'

export default class GoodsSuiteDetail extends BaseModel {
  static entity = 'goodsSuiteDetails'

  static methodConf = conf
}
