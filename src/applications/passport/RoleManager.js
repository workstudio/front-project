import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/passport/role-managers'

export default class RoleManager extends BaseModel {
  static entity = 'roleManagers'

  static methodConf = conf
}
