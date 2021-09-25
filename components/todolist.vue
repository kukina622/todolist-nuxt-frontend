<template>
  <div>
    <!-- show all tasks -->
    <v-expansion-panels multiple>
      <v-expansion-panel>
        <v-expansion-panel-header class="text-h6 white--text" color="#0091EA">
          未完成
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-simple-table>
            <thead>
              <tr>
                <th>待辦事項</th>
                <th>期限日期</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="70%">test</td>
                <td width="15%">2019-01-03</td>
                <td width="15%">
                  <v-btn icon small>
                    <v-icon color="#66BB6A"> mdi-check-circle-outline </v-icon>
                  </v-btn>
                  <v-btn icon small>
                    <v-icon color="error"> mdi-close-circle-outline </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="text-h6 white--text" color="#0091EA">
          已完成
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-simple-table>
            <thead>
              <tr>
                <th>已完成事項</th>
                <th>期限日期</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="70%">test</td>
                <td width="15%">2019-01-03</td>
                <td width="15%">
                  <v-btn icon small>
                    <v-icon color="error"> mdi-close-circle-outline </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="text-h6 white--text" color="error">
          已過期
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-simple-table>
            <thead>
              <tr>
                <th>未完成事項</th>
                <th>期限日期</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="70%">test</td>
                <td width="15%">2019-01-03</td>
                <td width="15%">
                  <v-btn icon small>
                    <v-icon color="error"> mdi-close-circle-outline </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- add new task -->
    <v-footer app color="transparent">
      <div class="footer_content">
        <v-row justify="center" align="center">
          <v-col cols="10">
            <v-form ref="form">
              <v-text-field
                class="white--text"
                hide-details
                background-color="transparent"
                outlined
                prepend-inner-icon="mdi-plus-circle-outline"
                :rules="[rules.required]"
                @click:prepend-inner="submit"
                v-model="newTask"
              >
              </v-text-field>
            </v-form>
          </v-col>
          <v-col cols="2" class="white--text">
            {{ date }}
            <v-btn icon @click="date_dialog = true">
              <v-icon color="white">mdi-calendar</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-footer>
    <!-- select finish date -->
    <v-dialog v-model="date_dialog" width="300px">
      <v-date-picker
        v-model="date"
        :min="formateDate(Date.now())"
      ></v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: this.formateDate(Date.now()),
      date_dialog: false,
      rules: {
        required: (values) => !!values || 'The field is required',
      },
      newTask: '',
    }
  },
  methods: {
    formateDate(date) {
      const tmp = new Date(date)
      const [month, day, year] = [
        tmp.getMonth(),
        tmp.getDate(),
        tmp.getFullYear(),
      ]
      if (Math.floor((month + 1) / 10) === 0) {
        return `${year}-0${month + 1}-${day}`
      }
      return `${year}-${month + 1}-${day}`
    },
    submit() {
      const validate = this.$refs.form.validate()
      if (validate) {
        // Write your code here
      }
    },
  },
}
</script>

<style scoped>
.v-expansion-panels >>> * {
  font-family: 'Microsoft JhengHei' !important;
}
.v-expansion-panels >>> .v-expansion-panel-header__icon .v-icon,
.v-input >>> .v-input__icon button {
  color: white !important;
}
.v-input >>> input {
  color: white;
}
.footer_content {
  display: inline-flex;
  width: 90%;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 10px;
  max-width: 1728px;
}
.v-footer {
  display: flex;
  justify-content: center;
}
.v-expansion-panels {
  margin-bottom: 68px;
}
</style>
