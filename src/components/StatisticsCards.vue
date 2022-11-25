<script setup>
import ProgressBar from './ProgressBar.vue';

const props = defineProps({
    fullValue: Object,
    maxScore: Number
})

</script>
<template>
    <div class="card">
        <div class="cord-header">
            <h4>{{fullValue?.title}}</h4>
        </div>
        <div class="card-body">
            <div>
                <p v-for="key of fullValue.keys">{{key}}</p>
            </div>
            <div class="bar">
                <div class="single-bars" v-for="elem of fullValue.data">
                    <ProgressBar :maxScore="maxScore" :score="elem.value"></ProgressBar>
                </div>
            </div>
        </div>
      </div>
</template>
<style scoped>
.card {
  width: 600px;
  background-color: #fff;
  color: #000;
  border-radius: 15px;
  margin: 4% 0;
  padding: 0;
}
.cord-header {
    border-radius: 15px 15px 0 0;
    background: #0075FF;
    padding: 1em;
    text-align: start;
}
h4 {
  color: #fff;
  margin: 0;
  padding-left: 5%;
}

.card-body {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 2em;
}

.bar { 
    display: flex;
    flex-direction: column;
    align-items: center;
}

p {
    margin: 0;
    font-size: 13px;
}

.single-bars, p {
    height: 30px;
}
</style>