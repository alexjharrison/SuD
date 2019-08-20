<template>
  <div v-if="this.$store.state.game">
    <h4>Score</h4>
    <div class="other-boards-row">
      <div class="board other-boards" v-for="(board,i) in otherBoards" :key="i">
        <board v-bind="board" />
      </div>
    </div>
    <div id="circles"></div>
    <board id="main-board" class="board" v-bind="playerBoard" />
  </div>
</template>

<script>
import Board from "@/components/Board";
import { mapGetters } from "vuex";
export default {
  components: {
    Board
  },
  data() {
    return {
      playerNum: 0
    };
  },
  computed: {
    ...mapGetters(["otherBoards"]),
    playerBoard() {
      return this.$store.state.game.players[this.playerNum];
    }
  }
};
</script>

<style lang="scss" scoped>
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

@media only screen and (max-width: 780px) {
  .other-boards {
    margin-bottom: -26vw;
  }
}
</style>