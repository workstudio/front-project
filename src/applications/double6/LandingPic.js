import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/landing-pics'

export default class LandingPic extends BaseModel {
  static entity = 'landingPics'

  static methodConf = conf
}
