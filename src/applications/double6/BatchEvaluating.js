import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/batch-evaluatings'

export default class BatchEvaluating extends BaseModel {
  static entity = 'batchEvaluatings'

  static methodConf = conf
}
