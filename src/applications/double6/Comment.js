import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/comments'

export default class Comment extends BaseModel {
  static entity = 'comments'

  static methodConf = conf
}
