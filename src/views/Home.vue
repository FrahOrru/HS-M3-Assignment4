<script setup>
import { ref } from 'vue';
import UsMapSvg from '../components/UsMapSvg.vue';
import router from '../router';

let stateSelection = ref();

function onStateSelection(id) {
    stateSelection.value = id;
    router.push({path: 'state/' + id, params: {id}});
  }
</script>
<template>
  <div class="title">
    <div>
      <h1>Federal Bureau of Investigation</h1>
      <h2>Crime Data Explorer</h2>
    </div>
  </div>
  <div class="map">
    <UsMapSvg @onStateSelection="onStateSelection"></UsMapSvg>
  </div>
</template>
<style scoped>
.title {
    height: 100vh;
    display: flex;
    color: #fff;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    align-content: center;
}
.map {
  background-color: rgb(27, 27, 27);
}

img:hover{
  cursor: pointer;
}
</style>