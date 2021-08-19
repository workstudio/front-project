import { Database } from '@vuex-orm/core'

import app from './app'
import errorLog from './errorLog'
import permission from './permission'
import settings from './settings'
import tagsView from './tagsView'
import user from './user'

import getters from './getters'

import passportDatabases from '@/applications/passport/database'
import merchantDatabases from '@/applications/merchant/database'
import thirdDatabases from '@/applications/third/database'
import infocmsDatabases from '@/applications/infocms/database'
import cultureDatabases from '@/applications/culture/database'
import bigdataDatabases from '@/applications/bigdata/database'
import paytradeDatabases from '@/applications/paytrade/database'
import shopDatabases from '@/applications/shop/database'
import benchDatabases from '@/applications/bench/database'

let databases = {
  passport: passportDatabases,
  merchant: merchantDatabases,
  third: thirdDatabases,
  infocms: infocmsDatabases,
  culture: cultureDatabases,
  bigdata: bigdataDatabases,
  paytrade: paytradeDatabases,
  shop: shopDatabases,
  bench: benchDatabases,
}
//databases = Object.assign(databases, merchantDatabases);
//databases = Object.assign(databases, passportDatabases);

const database = new Database()
const currentVuexs = {
  app,
  errorLog,
  permission,
  tagsView,
  settings,
  user
};

for (let key in databases) {
  for (let subKey in databases[key]) {
    database.register(databases[key][subKey], {}) 
    //database.register(databases[key], {}) 
  }
}

export {database, databases, currentVuexs, getters}
