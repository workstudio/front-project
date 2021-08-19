import BaseModel from './BaseModel';
let conf = BaseModel.getMethodConf();
conf.http.url = '/paytrade/logistics-companies'

export default class LogisticsCompany extends BaseModel {
  static entity = 'logisticsCompanies'

  static methodConf = conf
}
