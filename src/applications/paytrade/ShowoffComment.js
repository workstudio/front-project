import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/paytrade/showoff-comments'

export default class ShowoffComment extends BaseModel {
  static entity = 'showoffComments'

  static methodConf = conf
}
