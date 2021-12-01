<template>
  <div class="outer1">
    <p>這裡是test page 紅框範圍都是喔</p>
    <testComponent />
    <!-- 測試plugin -->
    <!-- 講到這裡的時候再把註解拿掉 -->
    <!-- <v-btn @click="test" outlined color="#FFF">我是按鈕</v-btn> -->

    <!-- asyncData用的 -->
    <!-- 講到這裡的時候再把註解拿掉 -->
    <!-- <p>我現在有登入嗎：{{ isLogin }}</p> -->
  </div>
</template>

<script>
import testComponent from '@/components/testComponent.vue'
export default {
  components: { testComponent },
  layout: 'testLayout',
  // asyncData用的
  // 還沒講到可以先不看
  async asyncData(context) {
    const { isLogin } = (await context.app.$api.user.isLogin()).data
    return {
      isLogin: isLogin,
    }
  },
  // plugin用的
  // 還沒講到可以先不看
  methods: {
    test() {
      // you can test your plugin here
      this.$WhereAmIStanding()
    },
  },
  // middleware用的
  // 還沒講到可以先不看
  middleware: 'testMiddleware',
}
</script>

<style scoped>
.outer1 {
  border: 3px solid red;
}
.outer1 > *{
  margin: 10px 0;
}

p {
  color: #fff;
}
</style>
