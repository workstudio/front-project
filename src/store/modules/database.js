import { Database } from '@vuex-orm/core'

//import app from './app'

import book from './book'
import home from './home'
import shelf from './shelf'
import user from './user'
import getters from '../getters'
import actions from '../actions'

import passportDatabases from '@/applications/passport/database'
import cultureDatabases from '@/applications/culture/database'
import readerModule from '@/applications/culture/ReaderModule'

let databases = {
  passport: passportDatabases,
  culture: cultureDatabases,
}
const currentVuexs = {
  reader: readerModule,
  book: book,
  home: home,
  shelf: shelf,
  user: user,
}

const database = new Database()

for (let key in databases) {
  for (let subKey in databases[key]) {
    database.register(databases[key][subKey], {}) 
    //database.register(databases[key], {}) 
  }
}

export {database, databases, currentVuexs, getters, actions}
