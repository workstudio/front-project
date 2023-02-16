import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/common-classes'

export default class CommonClass extends BaseModel {
  static entity = 'commonClasses'
  //static keyField = 'code'

  static methodConf = conf
}
