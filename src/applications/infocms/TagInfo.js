import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/tag-infos'

export default class TagInfo extends BaseModel {
  static entity = 'tagInfos'

  static methodConf = conf
}
