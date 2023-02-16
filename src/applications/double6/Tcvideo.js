import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/tcvideos'

export default class Tcvideo extends BaseModel {
  static entity = 'tcvideos'
  //static keyField = 'code'

  static methodConf = conf
}
