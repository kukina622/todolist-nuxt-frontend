<template>
  <v-app-bar app clipped-left color="#0091EA">
    <v-app-bar-title class="white--text">
      <h1 class="text-h6">To Do List</h1>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn color="#FFFFFF" nuxt outlined :to="{ name: 'register' }">註冊</v-btn>
    <v-btn
      nuxt
      color="#FFFFFF"
      class="ml-3 light-blue--text text--accent-4"
      :to="{ name: 'login' }"
      >登入
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
