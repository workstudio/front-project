import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/warehouses'

export default class Warehouse extends BaseModel {
  static entity = 'warehouses'

  static methodConf = conf
}
