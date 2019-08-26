<template>
  <div id="board">
    <div class="main-tiles-row">
      <div class="slots mr-2">
        <div
          v-for="(row,i) in scoringRows"
          :key="i"
          :class="'d-flex flex-row-reverse' + hoverClass"
          @click="submitRow(i)"
        >
          <div
            v-for="(square,idx) in row.slots"
            :class="squareClass + (square ? square.color : '' )"
            :key="idx"
          ></div>
        </div>
      </div>
      <div class="grid">
        <div v-for="(row,i) in grid.squares" :key="i" class="d-flex">
          <span
            v-for="(square,idx) in row"
            :key="idx"
            :class="squareClass + square.color + (!square.filled?' faded':'')"
          ></span>
        </div>
      </div>
    </div>
    <div :class="`penalties ${hoverClass}`" @click="submitRow(null)">
      <div v-for="(square,i) in penaltyRow.slots" :key="i">
        <div>{{square.points}}</div>
        <div :class="squareClass + (square.tile? square.tile.color:'')"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["grid", "id", "name", "penaltyRow", "score", "scoringRows"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["myBoard", "playerTurn"]),
    squareClass() {
      return this.myBoard.name !== this.name ? "square shrink " : "square ";
    },
    selectedTileId() {
      return this.$store.state.game.selectedTileId;
    },
    hoverClass() {
      const hoverable =
        this.selectedTileId &&
        this.playerTurn(this.$store.state.myName) &&
        this.myBoard.name === this.name;
      return hoverable ? " hoverable" : "";
    }
  },
  methods: {
    submitRow(rowId) {
      if (
        this.playerTurn(this.myBoard.name) &&
        this.myBoard.name === this.name &&
        this.selectedTileId
      )
        this.$socket.emit("TILE_PLACED", { rowId, playerNum: this.myBoard.id });
    }
  }
};
</script>

<style lang="scss" scoped>
#board {
  border: 2px solid rgb(192, 187, 180);
  box-shadow: 4px 4px 30px 0px rgb(177, 177, 177);
  padding: 5px;
  background-image: url("~@/assets/texture.jpg");
  background-color: #f8c994;

  border-radius: 10px;
  .main-tiles-row {
    width: 100%;
    display: flex;
    justify-content: center;
    .slots,
    .grid {
      // flex: 1 1 0;
    }
  }
  .penalties {
    display: flex;
    margin: 10px auto;
    text-align: center;
    max-width: 560px;
  }
}
.square {
  width: 7vw;
  height: 7vw;
  max-width: 51px;
  max-height: 51px;
  border-radius: 5px;
  background-color: #fff;
  margin: 2px;
  // border: 1px solid blue;
  box-shadow: 7px 7px 17px 6px rgba(148, 148, 148, 0.404);
}

.hoverable .square {
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
}
.hoverable:hover .square {
  background-color: rgb(202, 202, 202);
}

.faded {
  opacity: 0.2;
}

@media only screen and (max-width: 900px) {
  .shrink {
    max-width: 38px;
  }
}
@media only screen and (max-width: 700px) {
  .shrink {
    max-width: 28px;
  }
}
@media only screen and (max-width: 500px) {
  .shrink {
    max-width: 20px;
  }
}
</style>