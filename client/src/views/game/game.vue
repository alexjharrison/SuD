<template>
  <div v-if="this.$store.state.game">
    <div class="contain">
      <div class="d-flex justify-content-around">
        <h4 v-if="otherBoards[0]">{{otherBoards[0].name}}: {{otherBoards[0].score}}</h4>
        <h4 v-if="otherBoards[1]">{{otherBoards[1].name}}: {{otherBoards[1].score}}</h4>
        <h4 v-if="otherBoards[2]">{{otherBoards[2].name}}: {{otherBoards[2].score}}</h4>
      </div>
      <div class="other-boards-row">
        <div class="board other-boards" v-for="(board,i) in otherBoards" :key="i">
          <board v-bind="board" />
        </div>
      </div>
      <div id="circles" class="d-flex justify-content-around">
        <center-circle v-for="(circle,i) in circles" :key="i" />
      </div>
      <div class="d-flex">
        <div class="flex-grow-1 d-flex flex-column justify-content-between">
          <pot />
          <div class="d-flex align-items-center px-3">
            <b-img fluid src="@/assets/logo.png" alt="sud logo" class="logo-img" />
            <div class="text-center w-100">
              <h2>{{myBoard.name}}</h2>
              <h3>Score: {{myBoard.score}}</h3>
            </div>
          </div>
        </div>
        <board id="main-board" class="board" v-bind="playerBoard" />
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
    return {
      playerNum: 0
    };
  },
  computed: {
    ...mapGetters(["otherBoards", "myBoard"]),
    circles() {
      return this.$store.state.game.circles;
    },
    playerBoard() {
      return this.$store.state.game.players[this.playerNum];
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