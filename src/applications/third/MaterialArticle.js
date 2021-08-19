import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/third/material-articles'

export default class MaterialArticle extends BaseModel {
  static entity = 'materialArticles'

  static methodConf = conf
}
