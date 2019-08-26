import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    game: null,
    myName: 'Alex'
  },
  getters: {
    myBoard({ game, myName }) {
      return game.players.filter(({ name }) => name === myName)[0];
    },
    otherBoards({ game, myName }) {
      return game.players.filter(({ name }) => name !== myName);
    },
    playerTurn: ({ game }) => playerName => {
      const currentTurnId = game.turn;
      return game.players[currentTurnId].name === playerName;
    },
    isMyTurn: ({ game, myName }) => {
      return game.players[game.turn].name === myName;
    }
  },
  mutations: {
    SOCKET_UPDATE_GAME(state, payload) {
      state.game = { ...payload };
    },
    setName(state, name) {
      state.myName = name;
    }
  },
  actions: {}
});
