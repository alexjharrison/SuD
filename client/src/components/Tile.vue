<template>
  <div class="tile" @click="selectTile(tile)" :class="tileClass(tile.color)"></div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["tile", "selected"],
  computed: {
    ...mapGetters(["playerTurn", "myBoard"]),
    myName() {
      return this.$store.state.myName;
    },
    selectedTileId() {
      return this.$store.state.game.selectedTileId;
    }
  },
  methods: {
    tileClass(color) {
      return (
        "tile " +
        color +
        (this.selected ? " selected" : "") +
        (!this.selectedTileId && this.myName === this.playerTurn(this.myName)
          ? " cursor-pointer"
          : "")
      );
    },
    selectTile() {
      if (this.playerTurn(this.myName) && !this.selectedTileId) {
        this.$socket.emit("TILE_PICKED", {
          playerNum: this.myBoard.id,
          tileId: this.tile.id
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tile {
  width: 3vw;
  height: 3vw;
  max-width: 34px;
  max-height: 34px;
  margin: 2px;
  border-radius: 5px;
  border: rgb(112, 112, 112) solid 1px;
  transition: 0.13s ease-in-out transform, 0.13s ease-in-out border;
}
.tile:hover {
  transform: scale(1.2, 1.2);
}

.selected {
  border: rgb(0, 211, 18) solid 3px !important;
  transform: rotate(45deg) scale(1.3, 1.3) !important;
}
</style>
