<template>
  <div class="home">
    <div>
      <button @click="addPlayer">Add Player</button>
      <button @click="tilePicked">Tile Clicked</button>
      <button @click="tilePlaced">Tile Placed</button>
      <input type="text" v-model="playerName" placeholder="player name" />
      <input type="text" v-model="playerNum" placeholder="player number" />
      <input type="text" v-model="tileId" placeholder="tile Id" />
      <input type="text" v-model="rowId" placeholder="Row id" />
    </div>
    <div v-for="player in players" :key="player.id">{{player.name}}</div>
  </div>
</template>

<script>
import {} from "vuex";
export default {
  name: "home",
  data() {
    return {
      playerName: "",
      playerNum: 0,
      tileId: 0,
      rowId: 4
    };
  },
  computed: {
    players() {
      if (!this.$store.state.game) return [{ id: 0, name: "" }];
      return this.$store.state.game.players;
    }
  },
  methods: {
    addPlayer() {
      this.$socket.emit("PLAYER_CREATED", this.playerName);
    },
    tilePicked() {
      const { playerNum, tileId } = this;
      this.$socket.emit("TILE_PICKED", { playerNum, tileId });
    },
    tilePlaced() {
      const { playerNum, rowId } = this;
      this.$socket.emit("TILE_PLACED", { playerNum, rowId });
    }
  }
};
</script>

<style>
input {
  display: block;
}
</style>