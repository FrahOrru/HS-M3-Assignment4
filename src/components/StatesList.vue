<script setup>
import { ref } from 'vue';
import UsMapSvg from './UsMapSvg.vue';
import router from '../router/index';

let stateSelection = ref();

function onStateSelection(id) {
    stateSelection.value = id;
    router.push({path: 'states/' + id});
}

function onBack() {
    router.back();
  }
</script>
<template>
  <div class="header">
    <img src="../assets/curly-arrow.png" alt="back icon" @click="onBack()">
  </div>
  <div class="map">
    <UsMapSvg @onStateSelection="onStateSelection"></UsMapSvg>
  </div>
</template>
<style scoped>
.header {
  display: flex;
}

img {
  width: 40px;
  padding: 1%;
  border: 1px solid #fff;
  border-radius: 50%;
}

img:hover {
  animation: rot 0.8s;
}

@keyframes rot {
  100% {
    transform: rotate(360deg);
  }
}
</style>