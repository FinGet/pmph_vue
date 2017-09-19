import * as types from './mutation-types'

const mutations = {
  [types.TOGGLE_SILDBAR](state) {
    state.sidebarFlod = !state.sidebarFlod;
  },
};


export default mutations
