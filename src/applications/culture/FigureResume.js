import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/figure-resumes'

export default class FigureResume extends BaseModel {
  static entity = 'figureResumes'

  static methodConf = conf
}
