<template>
  <v-container fluid class="index_container">
    <navigator />
    <todolist />
  </v-container>
</template>

<script>
import navigator from '@/components/navigator.vue'
import todolist from '@/components/todolist.vue'
export default {
  components: { navigator, todolist },
}
</script>

<style scoped>
.index_container {
  max-width: 1920px;
}
</style>
