<script setup>

import {ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import {useRouter} from "vue-router";
import MissionForm from "@/components/MissionForm.vue";

const router = useRouter();

const form = ref({
  data: {
      name: "",
      launch_details: {
        launch_date: "",
        launch_site: {
          name: "",
          location: {
            latitude: '',
            longitude: ''
          }
        }
      },
      landing_details: {
        landing_date: "",
        landing_site: {
          name: "",
          coordinates: {
            latitude: '',
            longitude: ''
          }
        }
      },
      spacecraft: {
        command_module: "",
        lunar_module: "",
        crew: [
            {
              name: "",
              role: ""
            }
        ]
      }
  },
  errors: {}
});

const sendForm = async () => {
  const response = await apiFetch('post', '/lunar-missions', {
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
  <form class="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl" @submit.prevent="sendForm()">
    <MissionForm :form="form" />
    <a class="bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600" href="">К списку миссий</a>
  </form>
</template>
