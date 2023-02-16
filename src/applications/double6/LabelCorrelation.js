import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/label-correlations'

export default class LabelCorrelation extends BaseModel {
  static entity = 'labelCorrelations'

  static methodConf = conf
}
