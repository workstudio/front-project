import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/course-qrcode-configs'

export default class CourseQrcodeConfig extends BaseModel {
  static entity = 'courseQrcodeConfigs'

  static methodConf = conf
}
