<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/game/test">test</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["setName"])
  },
  mounted() {
    const name = window.prompt("enter name");
    if (name) this.setName(name);
  }
};
</script>

<style lang="scss">
body {
  background-color: #dbf8ff !important;
}
.red {
  background-color: #f90a0a !important;
}
.blue {
  background-color: #0b72c0 !important;
}
.orange {
  background-color: #fde047 !important;
  background-image: url("~@/assets/yellow.svg");
  background-size: cover;
  // background-size: 100%, 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.teal {
  background-color: #1ecdf3 !important;
  background-image: url("~@/assets/teal.svg");
  background-size: cover;
  // background-size: 100%, 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.black {
  background-image: url("~@/assets/black.svg");
  background-color: #000 !important;
  background-size: cover;
  // background-size: 100%, 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.one {
  background-image: url("~@/assets/one.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.cursor-pointer:hover {
  cursor: pointer;
}
</style>
