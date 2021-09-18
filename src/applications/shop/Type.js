import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/shop/types'

export default class Type extends BaseModel {
  static entity = 'types'
  static keyField = 'code'

  static methodConf = conf
}
