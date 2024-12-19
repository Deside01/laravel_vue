<script setup>
import MissionItem from "@/components/MissionItem.vue";
import {ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";

const searchQuery = ref("Evgeniy Cernan");
const missions = ref([]);

const search = async () => {
  const response = await apiFetch('get', `/search?query=${searchQuery.value}`);

  missions.value = response.data;
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit.prevent="search">

        <div>
          <label for="search" class="block text-sm font-medium leading-6 text-gray-900">Поиск</label>
          <div class="mt-2">
            <input v-model="searchQuery" id="search" name="search" type="search" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div @submit.prevent="search">
          <button type="submit" class="flex w-full justify-center rounded-md bg-sky-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Найти</button>
        </div>

        <div class="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
          <MissionItem v-if="missions" :compact="true" v-for="mission in missions" :mission="mission"></MissionItem>
        </div>


      </form>

    </div>
  </div>
</template>
