<script setup>
defineProps({
  error: Array
})
</script>

<template>
  <div class="invalid-field" v-if="error">
    {{ error.join(', ') }}
  </div>
</template>

<style scoped>

</style>