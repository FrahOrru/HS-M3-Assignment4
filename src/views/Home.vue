<script setup>
import Button from '../components/Button.vue'

</script>
<template>
  <div class="title">
    <div>
      <img src="../assets/logo.png" alt="fbi logo">
      <h1>Federal Bureau of Investigation</h1>
      <h2>Crime Data Explorer</h2>
      <Button></Button>
    </div>
  </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');
.title {
    height: 100%;
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

img{
  width: 200px;
}
h1,h2 {
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
}
</style>