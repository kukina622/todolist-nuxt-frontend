<template>
  <v-container fluid class="index_container">
    <navigator :isLogin="isLogin" />
    <todolist
      :tasks="tasks"
      @deleteTask="deleteTask"
      @completeTask="completeTask"
      @addTask="addTask"
    />
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
  methods: {
    deleteTask(tid) {
      const deleteIndex = this.tasks.findIndex((task) => task.tid === tid)
      this.tasks.splice(deleteIndex, 1)
    },
    completeTask(tid) {
      const completeIndex = this.tasks.findIndex((task) => task.tid === tid)
      this.tasks[completeIndex]['is_finish'] = true
    },
    async addTask() {
      const res = await this.$api.tasks.getTask()
      if (res instanceof Error) {
        return this.$alert.error(res.response.data)
      }
      this.tasks = res.data
    },
  },
}
</script>

<style scoped>
.index_container {
  max-width: 1920px;
}
</style>
