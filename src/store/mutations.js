import * as types from './mutation-types'

const mutations = {
  [types.TOGGLE_SILDBAR](state) {
    state.sidebarFlod = !state.sidebarFlod;
  },
  //更改面包屑导航
  [types.BREADCRUM](state,data) {
    let len = state.breadcrumb.length;
    if(data.breadNumber>len){
      while(data.breadNumber<=state.breadcrumb[state.breadcrumb.length-1].breadNumber){
        state.breadcrumb.splice(state.breadcrumb.length-1);
      }
      state.breadcrumb.push( data);
      return;
    }
    state.breadcrumb.splice(data.breadNumber);
    state.breadcrumb.splice(data.breadNumber-1, 1, data);
  },
};


export default mutations
