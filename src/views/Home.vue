<script setup>
import router from '../router';

function goToStatesList() {
  router.push({path: 'states'});
}
</script>
<template>
  <div class="title">
    <div>
      <img src="../assets/logo.png" alt="fbi logo">
      <h1>Federal Bureau of Investigation</h1>
      <h2>Crime Data Explorer</h2>
      <button @click="goToStatesList()">Get Started</button>
    </div>
  </div>
</template>
<style scoped>
.title {
    height: 100%;
    display: flex;
    color: #fff;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    align-content: center;
    font-family: Opens Sans, sans-serif;
}
.map {
  background-color: rgb(27, 27, 27);
}

img{
  width: 200px;
}
</style>