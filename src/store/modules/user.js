import * as types from '../mutation-types'
import router from '@/router/index'
const state = {
  tooken:null,
  userData:{
    userid:null,
    username:null,
    userlevel:null
  }
};
/**
 * 假数据
 */
var loginData = {
  root:{
    userid:'000000',
    name:'root',
    level:0
  },
  admin1:{
    userid:'111111',
    name:'admin1',
    level:1
  },
  admin2:{
    userid:'222222',
    name:'admin2',
    level:2
  },
  admin3:{
    userid:'333333',
    name:'admin3',
    level:3
  }
};

// getters
const getters = {
  getUserData: state => state.userData,
  getUserLevel:state => state.userData.level,
};

// actions
const actions = {
  doLogin ({ commit, state }, data) {
    console.log(data);

    //模拟登录
    setTimeout(()=>{
      const userdata = loginData[data.username]||{};
      commit(types.DO_LOGIN,userdata);
      router.push({path:'/'})
    },1000);
  }
}

// mutations
const mutations = {
  [types.DO_LOGIN] (state, {name,level}) {
    state.userData.username = name;
    state.userData.userlevel = level;
    console.log(state)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
