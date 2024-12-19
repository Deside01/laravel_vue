<script setup>
import {ref} from "vue";
import apiFetch from "@/helpers/apiFetch.js";
import ErrorField from "@/components/ErrorField.vue";
import {useRouter} from "vue-router";

const form = ref({
  data: {
    last_name: '',
    first_name: '',
    patronymic: '',
    email: '',
    birth_date: '',
    password: ''
  },
  errors: {},
  isProcessing: false,
});

const router = useRouter();

const sendForm = async () => {
  if (form.value.isProcessing) return;

  form.value.isProcessing = true;
  form.value.errors = {};


  const result = await apiFetch('post', '/registration', form.value.data);

  if (result.error) {
    form.value.errors = result.error.errors;
  }

  if (result.data) {
    await router.replace("/auth");
  }

  form.value.isProcessing = false;
}
</script>

<template>
  {{ form }}
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=sky&amp;shade=600" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Создайте свою учетную запись</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="sendForm()" action="#" method="POST">
        <div>
          <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900">Фамилия</label>
          <div class="mt-2">
            <input id="lastname" name="text" :class="{ 'has-error' : form.errors.last_name }" v-model="form.data.last_name" type="text" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
          </div>
          <ErrorField :error="form.errors.last_name" />
        </div>

        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Имя</label>
          <div class="mt-2">
            <input id="name" name="text" type="text" :class="{ 'has-error' : form.errors.first_name }" v-model="form.data.first_name" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
          </div>
          <ErrorField :error="form.errors.first_name" />
        </div>

        <div>
          <label for="patronymic" class="block text-sm font-medium leading-6 text-gray-900">Отчество</label>
          <div class="mt-2">
            <input id="patronymic" name="text" type="text" :class="{ 'has-error' : form.errors.patronymic }" v-model="form.data.patronymic" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
          </div>
          <ErrorField :error="form.errors.patronymic" />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Электронная почта</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" :class="{ 'has-error' : form.errors.email }" v-model="form.data.email" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
          </div>
          <ErrorField :error="form.errors.email" />
        </div>

        <div>
          <label for="b_date" class="block text-sm font-medium leading-6 text-gray-900">Дата рождения</label>
          <div class="mt-2">
            <input id="b_date" name="email" type="date" :class="{ 'has-error' : form.errors.birth_date }" v-model="form.data.birth_date" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
          </div>
          <ErrorField :error="form.errors.birth_date" />
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" :class="{ 'has-error' : form.errors.password }" v-model="form.data.password" class="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6">
          </div>
          <ErrorField :error="form.errors.password" />
        </div>

        <div>
          <button type="submit" :disabled="form.isProcessing" class="flex w-full justify-center rounded-md bg-sky-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Зарегистрироваться</button>
        </div>
      </form>

    </div>
  </div>
</template>
