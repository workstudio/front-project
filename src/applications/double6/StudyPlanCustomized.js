import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/study-plan-customizeds'

export default class StudyPlanCustomized extends BaseModel {
  static entity = 'studyPlanCustomizeds'

  static methodConf = conf
}
