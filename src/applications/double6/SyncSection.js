import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/sync-sections'

export default class SyncSection extends BaseModel {
  static entity = 'syncSections'

  static methodConf = conf
}
