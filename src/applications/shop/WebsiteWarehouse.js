import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/shop/website-warehouses'

export default class WebsiteWarehouse extends BaseModel {
  static entity = 'websiteWarehouses'

  static methodConf = conf
}
