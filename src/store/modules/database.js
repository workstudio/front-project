import { Database } from '@vuex-orm/core'

//import app from './app'

import getters from '../getters'

import passportDatabases from '@/applications/passport/database'
import cultureDatabases from '@/applications/culture/database'

let databases = {
  passport: passportDatabases,
  culture: cultureDatabases,
}

const database = new Database()
const currentVuexs = {
  //app
};

for (let key in databases) {
  for (let subKey in databases[key]) {
    database.register(databases[key][subKey], {}) 
    //database.register(databases[key], {}) 
  }
}

export {database, databases, currentVuexs, getters}
