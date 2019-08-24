<template>
  <div id="pot">
    <img src="~@/assets/pot.svg" alt="pot" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
  path {
    fill: blue !important;
  }
}
</style>