import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/passport/role-permissions'

export default class RolePermission extends BaseModel {
  static entity = 'rolePermissions'

  static methodConf = conf
}
