import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/' + BaseModel.appCode + '/managerlogs'
/*conf.methods = Object.assign(conf.methods, {
});*/

export default class Managerlog extends BaseModel {
  //static keyField = 'nickname'
  static entity = 'managerlogs'

  static methodConf = conf
}
