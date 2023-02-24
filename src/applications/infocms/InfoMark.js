import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/infocms/info-marks'

export default class InfoMark extends BaseModel {
  static entity = 'infoMarks'

  static methodConf = conf
}
