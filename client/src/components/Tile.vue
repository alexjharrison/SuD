<template>
  <div class="tile" @click="selectTile(tile)" :class="'tile ' + tile.color"></div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["tile"],
  computed: {
    ...mapGetters(["playerTurn", "myBoard"])
  },
  methods: {
    selectTile() {
      if (this.playerTurn) {
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
  background-color: red;
  margin: 2px;
  border-radius: 5px;
  border: rgb(112, 112, 112) solid 1px;
  transition: 0.13s ease-in-out transform;
}
.tile:hover {
  transform: scale(1.2, 1.2);
}
</style>
