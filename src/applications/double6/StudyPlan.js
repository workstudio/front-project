import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/study-plans'

export default class StudyPlan extends BaseModel {
  static entity = 'studyPlans'
  //static keyField = 'code'

  static methodConf = conf
}
