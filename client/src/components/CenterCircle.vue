<template>
  <div class="circle mx-1 my-2"></div>
</template>


<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.circle {
  flex: 1;
  border-radius: 50%;
  height: 120px;
  // background-color: #fbab7e;
  // background-color: rgb(255, 223, 116);
  background-color: rgb(202, 236, 251);
  // background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 55%);
  box-shadow: 6px 4px 20px 2px rgba(195, 155, 69, 0.609);
}
</style>