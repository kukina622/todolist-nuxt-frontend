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
  async asyncData(context) {
    const { isLogin } = (await context.app.$api.user.isLogin()).data
    if (isLogin) {
      const tasks = (await context.app.$api.tasks.getTask()).data
      return { isLogin, tasks }
    }
    return { isLogin }
  },
  components: { navigator, todolist },
}
</script>

<style scoped>
.index_container {
  max-width: 1920px;
}
</style>
