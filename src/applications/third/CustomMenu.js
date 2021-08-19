import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/third/custom-menus'

export default class CustomMenu extends BaseModel {
  static entity = 'customMenus'

  static methodConf = conf
}
