import BaseModel from './BaseModel';
import moduleConf from './ReaderModule';
let conf = BaseModel.getMethodConf();

export default class Reader extends BaseModel {
  static entity = 'readers'
  static moduleConf = moduleConf

  static methodConf = conf
}
