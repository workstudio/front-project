import router, { resetRouter } from '@/router'
import {globalSettings} from '@/utils/base'
import entranceModel from '@/applications/passport/Entrance'
import * as popMethod from '@/utils/popup'
import { loginCenter } from "@/api/user";

const state = {
  token: '',
  userData: {},
  managerData: {},
  managerType: '',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERDATA: (state, userData) => {
    state.userData = userData
  },
  SET_MANAGERDATA: (state, managerData) => {
    state.managerData = managerData
  },
  SET_MANAGERTYPE: (state, managerType) => {
    state.managerType = managerType
  },
}

const actions = {
  // user login
  login({ commit,state }, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      entranceModel.$create({params: {action: 'token', env_type: globalSettings.envType}, data: {name: username.trim(), password: password}}).then(response => {
        //if (globalSettings.envType != response.manager_type) {
          //popMethod.showMessage('error', '管理后台类型有误，请重新登录');
        //} else {
        response = response.data;
        commit('SET_TOKEN', response.access_token);
        commit('SET_USERDATA', response.user);
        //commit('SET_MANAGERDATA', response.manager);
        //commit('SET_MANAGERTYPE', response.manager_type);
        entranceModel.signupinCache(response);
        //}
        //setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  loginAction({ commit,state }, userInfo) {
    return new Promise((resolve, reject) => {
      loginCenter(userInfo)
        .then((response) => {
        console.log(response, 'rrrrrrrrrrrrr');

          response = response.data;
          let userData = {
            'access_token': response.tokenInfo.token.substring(7),
            'user': response.userInfo,
          };
          console.log(userData);
          commit('SET_TOKEN', userData.access_token);
          commit('SET_USERDATA', userData.user);
          //commit('SET_MANAGERDATA', response.manager);
          //commit('SET_MANAGERTYPE', response.manager_type);
          entranceModel.signupinCache(userData);
          resolve()
      }).catch(error => {
        reject(error)
      });
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
