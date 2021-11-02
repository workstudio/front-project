import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/figure-titles'

export default class FigureTitle extends BaseModel {
  static entity = 'figureTitles'

  static methodConf = conf
}
