import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/goods-suites'

export default class GoodsSuite extends BaseModel {
  static entity = 'goodsSuites'

  static methodConf = conf
}
