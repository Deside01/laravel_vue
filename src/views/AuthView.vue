<script setup>
import {inject, ref} from "vue";
import ErrorField from "@/components/ErrorField.vue";
import apiFetch from "@/helpers/apiFetch.js";
import {useRouter} from "vue-router";

const form = ref({
  data: {
    email: '',
    password: ''
  },
  errors: {},
});

const router = useRouter();
const updateToken = inject('updateToken');
const updateId = inject('updateUserId');

const sendForm = async () => {
  form.value.errors = {};

  const result = await apiFetch('post', '/authorization', form.value.data);

  if (result.error) {
    form.value.errors = result.error.errors;
  }

  if (result.code === 401) {
    form.value.errors = {
      email: [result.message]
    }
  }

  if (result.token) {
    updateToken(result.token);
    updateId(result.data.id);

    await router.replace("/");
  }
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=sky&amp;shade=600" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Войдите в свою учетную запись</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="sendForm()" action="#" method="POST">

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Электронная почта</label>
          <div class="mt-2">
            <input id="email" name="email" v-model="form.data.email" :class="{'has-error' : form.errors.email }" type="email" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
          </div>
          <ErrorField :error="form.errors.email" />
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
          </div>
          <div class="mt-2">
            <input id="password" name="password" v-model="form.data.password" :class="{'has-error' : form.errors.email }" type="password" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
          </div>
          <ErrorField :error="form.errors.password" />
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-sky-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Авторизоваться</button>
        </div>
      </form>

    </div>
  </div>
</template>
