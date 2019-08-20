<template>
  <div id="board">
    <div class="main-tiles-row">
      <div class="slots mr-2">
        <div v-for="(row,i) in scoringRows" :key="i" class="d-flex flex-row-reverse">
          <div v-for="(square,idx) in row.slots" :class="squareClass" :key="idx"></div>
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
    <div class="penalties">
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
    ...mapGetters(["myBoard"]),
    squareClass() {
      return this.myBoard.name !== this.name ? "square shrink " : "square ";
    }
  }
};
</script>

<style lang="scss" scoped>
#board {
  border: 2px solid red;
  padding: 5px;
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
  margin: 2px;
  border: 1px solid blue;
}
.red {
  background-color: red;
}
.blue {
  background-color: blue;
}
.orange {
  background-color: #fde047;
}
.teal {
  background-color: #1ecdf3;
}
.black {
  background-image: url("~@/assets/black.svg");
  background-color: #000;
  background-size: cover;
  // background-size: 100%, 100%;
  background-position: center;
  background-repeat: no-repeat;
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