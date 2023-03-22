import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/material-pseudos'

export default class MaterialPseudo extends BaseModel {
  static entity = 'materialPseudos'

  static methodConf = conf
}
