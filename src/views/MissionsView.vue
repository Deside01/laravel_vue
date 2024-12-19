<script setup>

import {inject, onMounted, ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import MissionItem from "@/components/MissionItem.vue";

const missions = ref([]);

onMounted(async () => {
  const response = await apiFetch('get','/lunar-missions');

  response.forEach(m => {
    const mission = m.mission;

    mission.is_open = false;

    missions.value.push(mission);
  })
});

const open = (mission) => {
  missions.value.forEach((mission) => mission.is_open = false);
  mission.is_open = !mission.is_open;
}

const deleteMission = async (mission) => {
  await apiFetch('delete', `/lunar-missions/${mission.id}`);
  const index = missions.value.indexOf(mission);
  missions.value.splice(index, 1);
}

</script>

<template>
  <div class="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
    <RouterLink to="/add-mission" class="bg-sky-500 text-white py-2 px-2 rounded shadow-md hover:bg-sky-600 mb-4">
      Добавить миссию
    </RouterLink>

    <MissionItem v-if="missions" v-for="mission in missions" :mission="mission" @open="open" @deleteMission="deleteMission"></MissionItem>
    <a class="bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600" href="">К списку миссий</a>
  </div>
</template>
