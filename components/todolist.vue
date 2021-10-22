<template>
  <div>
    <!-- show all tasks -->
    <v-expansion-panels multiple v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header class="text-h6 white--text" color="#0091EA">
          未完成
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-simple-table>
            <thead>
              <tr>
                <th width="70%">待辦事項</th>
                <th width="15%">期限日期</th>
                <th width="15%"></th>
              </tr>
            </thead>
            <tbody>
              <client-only>
                <tr v-for="(task, index) in unfinishedTask" :key="index">
                  <td width="70%">{{ task.description }}</td>
                  <td width="15%">{{ formateDate(task.end_date) }}</td>
                  <td width="15%">
                    <v-btn icon small @click="completeTask(task.tid)">
                      <v-icon color="#66BB6A">
                        mdi-check-circle-outline
                      </v-icon>
                    </v-btn>
                    <v-btn icon small>
                      <v-icon color="error" @click="deleteTask(task.tid)">
                        mdi-close-circle-outline
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </client-only>
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
                <th width="70%">已完成事項</th>
                <th width="15%">期限日期</th>
                <th width="15%"></th>
              </tr>
            </thead>
            <tbody>
              <client-only>
                <tr v-for="(task, index) in finishedTask" :key="index">
                  <td width="70%">{{ task.description }}</td>
                  <td width="15%">{{ formateDate(task.end_date) }}</td>
                  <td width="15%">
                    <v-btn icon small>
                      <v-icon color="error" @click="deleteTask(task.tid)">
                        mdi-close-circle-outline
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </client-only>
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
                <th width="70%">未完成事項</th>
                <th width="15%">期限日期</th>
                <th width="15%"></th>
              </tr>
            </thead>
            <tbody>
              <client-only>
                <tr v-for="(task, index) in overdueTask" :key="index">
                  <td width="70%">{{ task.description }}</td>
                  <td width="15%">{{ formateDate(task.end_date) }}</td>
                  <td width="15%">
                    <v-btn icon small>
                      <v-icon color="error" @click="deleteTask(task.tid)">
                        mdi-close-circle-outline
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </client-only>
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
                @keypress.enter="submit"
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
  props: {
    tasks: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      date: this.formateDate(Date.now()),
      now: new Date(this.formateDate(Date.now())),
      date_dialog: false,
      rules: {
        required: (values) => !!values || 'The field is required',
      },
      newTask: '',
      unfinishedTask: [],
      finishedTask: [],
      overdueTask: [],
      panel: [0, 1, 2],
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
    async submit(event) {
      event.preventDefault()
      const validate = this.$refs.form.validate()
      if (validate) {
        const res = await this.$api.tasks.postTask(this.newTask, this.date)
        this.$refs.form.reset()
        if (res instanceof Error) {
          return this.$alert.error(res.response.data)
        }
        this.$emit('addTask')
        this.$alert.success('新增成功')
      }
    },
    async deleteTask(tid) {
      const { isConfirmed } = await this.$alert.confirm('確定刪除？')
      if (isConfirmed) {
        const res = await this.$api.tasks.deleteTask(tid)
        if (res instanceof Error) {
          return this.$alert.error(res.response.data)
        }
        this.$emit('deleteTask', tid)
        this.$alert.success('刪除成功')
      }
    },
    async completeTask(tid) {
      const res = await this.$api.tasks.patchTask(tid, true)
      if (res instanceof Error) {
        return this.$alert.error(res.response.data)
      }
      this.$emit('completeTask', tid)
      this.$alert.success('更新成功')
    },
  },
  watch: {
    tasks: {
      handler() {
        let unfinishedTask = []
        let finishedTask = []
        let overdueTask = []
        for (let task of this.tasks) {
          const taskDate = new Date(task.end_date)
          if (task.is_finish) {
            finishedTask.push(task)
          } else if (this.now.valueOf() <= taskDate.valueOf()) {
            unfinishedTask.push(task)
          } else {
            overdueTask.push(task)
          }
        }
        this.unfinishedTask = unfinishedTask
        this.finishedTask = finishedTask
        this.overdueTask = overdueTask
      },
      deep: true,
      immediate: true,
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
