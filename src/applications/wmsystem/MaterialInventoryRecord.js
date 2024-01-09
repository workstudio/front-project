import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/material-inventory-records'

export default class MaterialInventoryRecord extends BaseModel {
  static entity = 'materialInventoryRecords'

  static methodConf = conf
}
