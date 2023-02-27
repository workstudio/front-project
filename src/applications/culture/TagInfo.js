import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/tag-infos'

export default class TagInfo extends BaseModel {
  static entity = 'cultureTagInfos'

  static methodConf = conf
}
