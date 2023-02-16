import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/aggregate-pages'

export default class AggregatePage extends BaseModel {
  static entity = 'aggregatePages'

  static methodConf = conf
}
