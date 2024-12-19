<script setup>
import { RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
import {provide, ref} from "vue";

const token = ref(localStorage.getItem('user-token'));
const id = ref(localStorage.getItem('user-id'));

const updateToken = (newToken) => {
  if (!newToken) {
    localStorage.removeItem('user-token');
  } else {
    localStorage.setItem('user-token', newToken);
  }

  token.value = newToken;
}

const updateId = (newId) => {
  if (!newId) {
    localStorage.removeItem('user-id');
  } else {
    localStorage.setItem('user-id', newId);
  }

  id.value = newId;
}

provide('token', token);
provide('user-id', id);
provide('updateUserId', updateId);
provide('updateToken', updateToken);

</script>

<template>

  <Header/>
  <RouterView/>
</template>

<style>
.invalid-field {
  color: red;
}

.has-error {
  border: 1px solid red !important;
}
</style>

