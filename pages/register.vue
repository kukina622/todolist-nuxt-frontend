<template>
  <v-container class="d-flex justify-center">
    <v-card width="600px" height="620px" class="mt-5">
      <v-btn icon large @click="backPage">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-card-title class="d-flex justify-center text-h3 font-weight-bold"
        >Sign up</v-card-title
      >
      <v-card-text class="mt-10">
        <v-form ref="form">
          <v-row justify="center">
            <v-col cols="8">
              <v-text-field
                label="Username"
                outlined
                v-model="username"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="Password"
                outlined
                v-model="password"
                :rules="[rules.required]"
                type="password"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="Confirm password"
                outlined
                v-model="confirmPwd"
                :rules="[rules.required, rules.confirmPwd]"
                type="password"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-btn block color="#0091EA" class="white--text" @click="submit">
                註冊
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPwd: '',
      rules: {
        required: (values) => !!values || 'The field is required',
        confirmPwd: () =>
          this.password === this.confirmPwd || 'Must match password',
      },
    }
  },
  methods: {
    backPage() {
      this.$router.go(-1)
    },
    async submit() {
      const validate = this.$refs.form.validate()
      if (validate) {
        const res = await this.$api.user.register(this.username, this.password)
        if (res instanceof Error) {
          return this.$alert.error(res.response.data)
        }
        this.$alert.success('註冊成功')
        this.$router.push({ name: 'index' })
      }
    },
  },
}
</script>
