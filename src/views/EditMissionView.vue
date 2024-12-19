<script setup>

import {onMounted, ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import {useRoute, useRouter} from "vue-router";
import MissionForm from "@/components/MissionForm.vue";

const router = useRouter();
const route = useRoute();

const form = ref({
  data: null,
  errors: {}
});
const id = route.params.id;

onMounted(async () => {
  const response = await apiFetch('get', `/lunar-missions/${id}`);

  form.value.data = response.mission;
})

const sendForm = async () => {
  const response = await apiFetch('post', `/lunar-missions/${id}`, {
    _method: "PATCH",
    mission: form.value.data
  });

  if (response.error) {
    form.value.errors = response.error.errors;
  }

  if (response.data) {
    await router.replace("/missions");
  }
}

</script>

<template>
  <form class="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl" @submit.prevent="sendForm()" v-if="form.data">
    <MissionForm :form="form" />
    <a class="bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600" href="">К списку миссий</a>
  </form>
</template>
