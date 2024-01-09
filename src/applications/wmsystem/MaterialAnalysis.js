import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/wmsystem/material-analyses'

export default class MaterialAnalysis extends BaseModel {
  static entity = 'materialAnalysis'

  static methodConf = conf
}
