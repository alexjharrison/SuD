<template>
  <div id="pot">
    <div class="p-2 d-flex flex-wrap justify-content-center">
      <tile v-for="tile in tiles" :key="tile.id" :tile="tile" :selected="isTileHighlighted(tile)" />
    </div>
  </div>
</template>

<script>
import Tile from "@/components/Tile";
export default {
  components: {
    Tile
  },
  props: ["tiles"],
  methods: {
    isTileHighlighted(tile) {
      const selectedTileId = this.$store.state.game.selectedTileId;
      const selectedTile = this.tiles.filter(
        ({ id }) => id === selectedTileId
      )[0];
      // check if tile is in circle
      if (selectedTile) {
        if (tile.color === "one") return true;
        if (tile.color === selectedTile.color) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
#pot {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  font-size: 100px;
  flex: 1;
  justify-self: flex-start;
  //   background-color: rgb(255, 223, 116);
  background-color: rgb(104, 0, 136);
  //   background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 55%);
  width: 95%;
  border-radius: 10px;
  height: 100%;
  margin-bottom: 10px;
  background-image: url("~@/assets/pot.svg");
  background-repeat: no-repeat;
  background-position: center;
  path {
    fill: blue !important;
  }
}
</style>