<script setup>
import { ref, toRaw } from 'vue';

const props = defineProps({
  options: Array,
  placeholder: String,
});

const currentCrime = props.options[0]

const emit = defineEmits(['updateCurrentCrime']);

function updateCurrentCrime(currentCrime2) {
  emit('updateCurrentCrime', currentCrime2);
}
</script>

<template>
  <select v-model="currentCrime" @change="updateCurrentCrime(currentCrime)">
    <option v-for="option in options" :value="option">{{ option.value }}</option>
  </select>
</template>

<style scoped>
select{
  height: 50px;
  width: 200px;
  padding: 6%;
  font-size: 14px;
  background-color: transparent;
  color: white;
}
option {
  color: #000;
  margin: 5%;
}
</style>
