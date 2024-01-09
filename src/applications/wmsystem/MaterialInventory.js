import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/material-inventories'

export default class MaterialInventory extends BaseModel {
  static entity = 'materialInventories'

  static methodConf = conf
}
