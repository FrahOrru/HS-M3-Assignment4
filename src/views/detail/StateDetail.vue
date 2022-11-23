<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue'
import { useStore } from '../../store/store';
import StatisticsCards from '../../components/StatisticsCards.vue';
import router from '../../router/index';
  const props = defineProps({ id: String })

  const store = useStore();
  const { getOffenderDemographics, getVictiomDemographics, getCrimeLocation, getCrimeRelationship, getCrimeWeapons, getCrimeLinkedoffense } = storeToRefs(store);

  onMounted(() => {
    store.fetchSelectedStateValues(props.id)
    store.fetchOffenderDemographics(props.id);
    store.fetchVictimsDemographics(props.id);

    store.fetchCrimeLocation(props.id);
    store.fetchCrimeRelationship(props.id);

    store.fetchCrimeWeapons(props.id);
    store.fetchCrimeLinkedoffense(props.id);
  })

  function onBack() {
    router.back();
  }
</script>
<template>
  <div class="header">
    <img src="../../assets/curly-arrow.png" alt="back icon" @click="onBack()">
  </div>
    <div class="row">
      <StatisticsCards :fullValue="getOffenderDemographics"></StatisticsCards>
      <StatisticsCards :fullValue="getVictiomDemographics"></StatisticsCards>
    </div>

    <div class="row">
      <StatisticsCards :fullValue="getCrimeLocation"></StatisticsCards>
      <StatisticsCards :fullValue="getCrimeRelationship"></StatisticsCards>
    </div>

    <div class="row">
      <StatisticsCards :fullValue="getCrimeWeapons"></StatisticsCards>
      <StatisticsCards :fullValue="getCrimeLinkedoffense"></StatisticsCards>
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
.row {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>