//import syncReceive from '@/applications/common/SyncReceive'
//import localCache from '@/applications/common/LocalCache'
import {databases} from './modules/database'

const state = {
  cDatabases: databases,
  myPicUrl:'dd'
}

const actions = {
}

const getters = {
}

const mutations = {
  //codeGenerated(state, res) { state.codeGenerated = res }
  uploadmyPicUrl(state, res){
    state.myPicUrl = res
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
