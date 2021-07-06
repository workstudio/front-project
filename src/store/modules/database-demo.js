import { Database } from '@vuex-orm/core'

//import user from './user'
//import getters from '../getters'
//import actions from '../actions'
const getters = {};
const actions = {};

import passportDatabases from '@/applications/passport/database'

let databases = {
  passport: passportDatabases,
}
const currentVuexs = {
  //user: user,
}

const database = new Database()

for (let key in databases) {
  for (let subKey in databases[key]) {
    database.register(databases[key][subKey], {}) 
  }
}

export {database, databases, currentVuexs, getters, actions}
