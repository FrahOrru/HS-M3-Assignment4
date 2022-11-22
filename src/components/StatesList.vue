<script setup>
import { ref } from 'vue';
import UsMapSvg from './UsMapSvg.vue';
import router from '../router';

let stateSelection = ref();

function onStateSelection(id) {
    stateSelection.value = id;
    router.push({path: 'states/' + id, params: {id}});
}
</script>
<template>
  <div class="map">
    <UsMapSvg @onStateSelection="onStateSelection"></UsMapSvg>
  </div>
</template>
<style scoped>
</style>