<script setup>
	import { ref } from 'vue'
	const response = ref({})

  // adding delay
  await new Promise(resolve => {
    setTimeout(() => { 
      resolve(true)
    }, 1000)
  })
    
  try {
    const res = await fetch('https://api.usa.gov/crime/fbi/sapi/api/data/supplemental/national/property_type/2021/2022?API_KEY=0DK9v5A3mzlvUJphIjhAeCsg2hdvsmqnLxmGP7Ko')
    console.log(res)
    response.value = (await res.json())
  } catch (error) {
    response.value = { answer: 'Error! Could not reach the API. ' + error, image: '' }
  }

</script>

<template>
  <p>{{ response}}</p>
</template>