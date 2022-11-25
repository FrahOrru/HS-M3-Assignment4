<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useStore } from '../store/store';

const props = defineProps({ score: Number})

const store = useStore();
const { getCurrentProgressMaxScore } = storeToRefs(store);

let percentageVal = ref(1);

watch(getCurrentProgressMaxScore, () => {
    percentageVal.value = (props.score /  getCurrentProgressMaxScore.value) * 100;
})
</script>
<template>
    <div class="percentage">
        <span>{{score}}</span>
        <progress class="progress-bar" :value="percentageVal" max="100"></progress>
    </div>
</template>
<style scoped>
.percentage {
    display: flex;
    align-items: center;
}

span {
    padding-right: 10%;
    font-size: 13px;
}
</style>