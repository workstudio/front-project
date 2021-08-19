import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/shop/website-skus'

export default class WebsiteSku extends BaseModel {
  static entity = 'websiteSkus'

  static methodConf = conf
}
