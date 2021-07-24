import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/bigdata/data-syncs'

export default class DataSync extends BaseModel {
  static entity = 'dataSyncs'

  static methodConf = conf
}
