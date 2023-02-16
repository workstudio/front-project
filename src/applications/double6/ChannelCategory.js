import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/channel-categories'

export default class ChannelCategory extends BaseModel {
  static entity = 'channelCategories'

  static methodConf = conf
}
