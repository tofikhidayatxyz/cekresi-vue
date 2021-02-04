<template>
  <div class="w-100 mt-5">
    <h4 class="font-weight-bold">History Pengiriman</h4>
    <div class="w-100 history-parent mt-4">
      <div
        class="w-100 d-flex history-list"
        v-for="(itm, key) in data.history"
        :key="key"
      >
        <div class="history-icon">
          <span></span>
        </div>
        <div class="history-data">
          <h5 class="font-weight-bold">{{ itm.position }}</h5>
          <p class="mb-0">{{ itm.desc }}</p>
          <span class="text-grey"
            >{{ parseTime(itm.time) }} - {{ parseHumanizeTime(itm.time) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import _ from 'lodash'
export default {
  props: {
    data: Object,
  },
  methods: {
    parseTime(time) {
      moment.locale('id')
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    parseHumanizeTime(time) {
      moment.locale('id')
      return _.upperFirst(moment(time).fromNow())
    },
  },
}
</script>
