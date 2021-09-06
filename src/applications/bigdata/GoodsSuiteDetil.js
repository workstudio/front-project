import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/goods-suite-detils'

export default class GoodsSuiteDetil extends BaseModel {
  static entity = 'goodsSuiteDetils'

  static methodConf = conf
}
