import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/shop/categories'

export default class Category extends BaseModel {
  static entity = 'shopCategories'
  static keyField = 'code'

  static methodConf = conf
}
