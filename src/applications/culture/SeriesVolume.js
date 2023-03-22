import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/culture/series-volumes'

export default class SeriesVolume extends BaseModel {
  static entity = 'seriesVolumes'

  static methodConf = conf
}
