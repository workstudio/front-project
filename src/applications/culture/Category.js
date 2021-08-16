import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/categories'

export default class Category extends BaseModel {
  static entity = 'cultureCategory'
  static keyField = 'code'

  static methodConf = conf
}
