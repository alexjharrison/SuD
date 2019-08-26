<template>
  <div v-if="this.$store.state.game">
    <div class="contain">
      <div class="d-flex justify-content-around">
        <h4
          v-for="board in otherBoards"
          :key="board.id"
          :class="playerNameClass(board.id)"
        >{{board.name}}: {{board.score}}</h4>
      </div>
      <div class="other-boards-row">
        <div class="board other-boards" v-for="(board,i) in otherBoards" :key="i">
          <board v-bind="board" />
        </div>
      </div>
      <div id="circles" class="d-flex justify-content-around">
        <center-circle v-for="(circle,i) in circles" :key="i" :tiles="circle" />
      </div>
      <div class="d-flex">
        <div class="flex-grow-1 d-flex flex-column justify-content-between">
          <pot :tiles="pot" />
          <div class="d-flex align-items-center px-3">
            <b-img fluid src="@/assets/logo.png" alt="sud logo" class="logo-img" />
            <div class="text-center w-100">
              <h2 :class="playerNameClass(myBoard.id)">{{myBoard.name}}</h2>
              <h3>Score: {{myBoard.score}}</h3>
            </div>
          </div>
        </div>
        <board id="main-board" class="board" v-bind="myBoard" />
      </div>
    </div>
  </div>
</template>

<script>
import Board from "@/components/Board";
import CenterCircle from "@/components/CenterCircle";
import Pot from "@/components/Pot";
import { mapGetters } from "vuex";
export default {
  components: {
    Board,
    CenterCircle,
    Pot
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["otherBoards", "myBoard"]),
    circles() {
      return this.$store.state.game.circles;
    },
    pot() {
      return this.$store.state.game.pot;
    }
  },
  methods: {
    playerNameClass(id) {
      return id === this.$store.state.game.turn ? "turn" : "";
    }
  }
};
</script>

<style lang="scss" scoped>
.contain {
  max-width: 1200px;
  margin: 0 auto;
}
#main-board {
  // width: 100vw;
}
.other-boards-row {
  display: flex;
  justify-content: space-around;
  .other-boards {
    transform: scale(0.5, 0.5) rotate(180deg) translate(50%, 50%);
    margin-bottom: -180px;
    margin-right: -280px;
  }
}
.board {
  max-width: 570px;
}
.logo-img {
  border-radius: 20px;
  max-width: 180px;
}

h2,
h4 {
  padding: 5px;
  display: inline;
  border-radius: 5px;
  margin: 6px 0;
  border: 1px solid transparent;
}
.turn {
  transition: 0.8s ease-in-out background-color, 0.8s ease-in-out border;
  border: 1px solid rgb(224, 167, 44);
  background-color: beige;
}

@media only screen and (max-width: 900px) {
  .logo-img {
    display: none;
  }
}
@media only screen and (max-width: 780px) {
  .other-boards {
    margin-bottom: -26vw;
  }
}
</style>