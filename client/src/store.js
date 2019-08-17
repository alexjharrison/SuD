import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    game: null
  },
  mutations: {
    SOCKET_UPDATE_GAME(state, payload) {
      state.game = { ...payload };
    }
  },
  actions: {}
});
