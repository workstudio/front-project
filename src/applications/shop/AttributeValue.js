import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/shop/attribute-values'

export default class AttributeValue extends BaseModel {
  static entity = 'attributeValues'

  static methodConf = conf
}
