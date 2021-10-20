<template>
  <v-container fluid class="index_container">
    <navigator :isLogin="isLogin" />
    <todolist :tasks="tasks" />
  </v-container>
</template>

<script>
import navigator from '@/components/navigator.vue'
import todolist from '@/components/todolist.vue'
export default {
  async asyncData(context) {
    const { isLogin } = (await context.app.$api.user.isLogin()).data
    let tasks = []
    if (isLogin) {
      tasks = (await context.app.$api.tasks.getTask()).data
    }
    return { isLogin, tasks }
  },
  components: { navigator, todolist },
}
</script>

<style scoped>
.index_container {
  max-width: 1920px;
}
</style>
