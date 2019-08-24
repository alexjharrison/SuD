<template>
  <div class="circle mx-1 my-2 d-flex align-items-center">
    <div class="p-2 d-flex flex-wrap justify-content-center">
      <tile v-for="tile in tiles" :key="tile.id" :tile="tile" />
    </div>
  </div>
</template>


<script>
import Tile from "@/components/Tile";
export default {
  props: ["tiles"],
  components: {
    Tile
  },
  computed: {
    turn() {
      return this.$store.state.game.turn;
    },
    isTileHighlighted(tile) {
      const selectedTileId = this.$store.state.game.selectedTileId;
      const selectedTile = this.tiles.filter(
        ({ id }) => id === selectedTileId
      )[0];
      // check if tile is in circle
      if (selectedTile.length > 0) {
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.circle {
  border-radius: 50%;
  height: 120px;
  width: 120px;
  background-image: url("~@/assets/circle.svg");
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  box-shadow: 6px 4px 20px 2px rgba(195, 155, 69, 0.609);
}

.tile {
  width: 3vw;
  height: 3vw;
  background-color: red;
  margin: 2px;
  border-radius: 5px;
  border: rgb(112, 112, 112) solid 1px;
  transition: 0.13s ease-in-out transform;
}
.tile:hover {
  transform: scale(1.2, 1.2);
}
@media only screen and (max-width: 1160px) {
  .circle {
    box-shadow: none;
  }
}
</style>