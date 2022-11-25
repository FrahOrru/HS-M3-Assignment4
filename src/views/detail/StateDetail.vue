<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref, toRaw } from 'vue'
import { useStore } from '../../store/store';
import StatisticsCards from '../../components/StatisticsCards.vue';
import router from '../../router/index';
import Selector from '../../components/Select.vue';
  const props = defineProps({ id: String })

  const store = useStore();
  const { getOffenderDemographics, getVictiomDemographics, getCrimeLocation, getCrimeRelationship, getCrimeWeapons, getCrimeLinkedoffense, getAllCrimeTypes} = storeToRefs(store);

  let currentCrime = 'violent-crime';

  onMounted(() => {
    allCalls();
  })

  function onSelectItemClickTypes(selectedItem){
    currentCrime = toRaw(selectedItem.value);
    allCalls();
  }

  function onBack() {
    router.back();
  }

  function allCalls(){
    console.log(currentCrime);
    store.fetchSelectedStateValues(props.id, currentCrime)
    store.fetchOffenderDemographics(props.id, currentCrime);
    store.fetchVictimsDemographics(props.id, currentCrime);

    store.fetchCrimeLocation(props.id, currentCrime);
    store.fetchCrimeRelationship(props.id, currentCrime);

    store.fetchCrimeWeapons(props.id, currentCrime);
    store.fetchCrimeLinkedoffense(props.id, currentCrime);

    setTimeout(() => {
      store.changeProgressMaxScore(currentCrime);
    }, 500)
  }

</script>
<template>
  <div class="header">
    <img src="../../assets/curly-arrow.png" alt="back icon" @click="onBack()">
  </div>
  <div class="row">
    <div>
      <Selector @updateCurrentCrime="onSelectItemClickTypes" :options="getAllCrimeTypes" :placeholder="'CrimeType'"></Selector>
    </div>
  </div>
    <div class="row">
      <StatisticsCards :fullValue="getOffenderDemographics" v-if="getOffenderDemographics.data && getOffenderDemographics.data.length !== 0"></StatisticsCards>
      <StatisticsCards :fullValue="getVictiomDemographics"  v-if="!!getOffenderDemographics.data && getOffenderDemographics.data.length !== 0"></StatisticsCards>
    </div>

    <div class="row">
      <StatisticsCards :fullValue="getCrimeLocation"  v-if="!!getCrimeLocation.data && getCrimeLocation.data.length !== 0"></StatisticsCards>
      <StatisticsCards :fullValue="getCrimeRelationship"  v-if="!!getCrimeRelationship.data && getCrimeRelationship.data.length !== 0"></StatisticsCards>
    </div>

    <div class="row">
      <StatisticsCards :fullValue="getCrimeWeapons"  v-if="!!getCrimeWeapons.data && getCrimeWeapons.data.length !== 0"></StatisticsCards>
      <StatisticsCards :fullValue="getCrimeLinkedoffense"  v-if="!!getCrimeLinkedoffense.data && getCrimeLinkedoffense.data.length !== 0"></StatisticsCards>
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