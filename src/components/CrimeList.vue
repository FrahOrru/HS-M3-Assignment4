<script setup>
	import { ref } from 'vue'
  import UsMapSvg from './UsMapSvg.vue';

	const response = ref({})
  const myKey = '?API_KEY=0DK9v5A3mzlvUJphIjhAeCsg2hdvsmqnLxmGP7Ko';
  const baseUrl = 'https://api.usa.gov/crime/fbi/sapi'

  let stateSelection = ref();
  // adding delay
  await new Promise(resolve => {
    setTimeout(() => { 
      resolve(true)
    }, 1000)
  })
    
  try {
    const res = await fetch(baseUrl + '/api/data/supplemental/national/property_type/2021/2022' + myKey)
    response.value = (await res.json())
  } catch (error) {
    response.value = { answer: 'Error! Could not reach the API. '}
  }

  
</script>

<template>
</template>

<style>
</style>