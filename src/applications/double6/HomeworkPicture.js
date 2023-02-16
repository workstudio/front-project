import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/double6/homework-pictures'

export default class HomeworkPicture extends BaseModel {
  static entity = 'homeworkPictures'

  static methodConf = conf
}
