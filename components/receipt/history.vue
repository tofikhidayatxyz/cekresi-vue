<template>
  <div class="card mt-4">
    <div class="card-header bg-primary">
      <h5 class="text-white mb-0">Pencarian terakhir</h5>
    </div>
    <div class="card-body">
      <div class="w-100">
        <ul class="list-unstyled list-history">
          <li class="mt-3" v-for="(itm, key) in oldHistory" :key="key">
            <div
              class="w-100 d-flex"
              @click="(e) => setForm(itm.courier, itm.code)"
            >
              <img
                :src="`https://api.resi.tofikhidayat.xyz/storages/couriers/${itm.courier.icon}`"
                height="40"
                width="40"
                alt=""
              />
              <div class="mr-auto px-3">
                <h5 class="text-dark mb-0 font-weight-bold">
                  {{ itm.code }}
                </h5>
                <span class="text-grey">{{ parseTime(itm.createdAt) }}</span>
              </div>
              <div class="ml-auto">
                <button
                  class="btn p-0 shadow-none"
                  @click.prevent="(e) => deleteHistory(e, itm.code)"
                >
                  <i class="bx bx-trash text-danger text-xl"></i>
                </button>
              </div>
            </div>
          </li>
        </ul>
        <button
          class="btn btn-primary btn-block text-white"
          @click.prevent="deleteAllHistory"
        >
          Hapus Semua
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    oldHistory: Array,
    deleteHistory: Function,
    deleteAllHistory: Function,
    setForm: Function,
  },
  methods: {
    parseTime: (time) => {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
  },
}
</script>
