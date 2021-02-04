<template>
  <div class="card">
    <div class="card-header bg-primary">
      <h5 class="text-white mb-0">Cari Resi</h5>
    </div>
    <div class="card-body">
      <form action="">
        <div class="form-group">
          <label for="courier" class="col-form-label"
            >Kurir <sup class="text-danger">*</sup>
          </label>
          <select type="text" class="form-control" v-model="formData.courier">
            <option :value="null" disabled selected>Pilih Kurir</option>
            <option v-for="(itm, key) in couriers" :key="key" :value="itm">
              {{ itm.label }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="courier" class="col-form-label"
            >Nomor Resi <sup class="text-danger">*</sup>
          </label>
          <input
            type="text"
            class="form-control"
            v-model="formData.code"
            placeholder="Masukan nomor resi ..."
          />
        </div>
      </form>
      <div class="w-100 mt-4">
        <button
          class="btn btn-primary btn-block text-white"
          :disabled="!isValid"
          @click.prevent="handleSubmit"
        >
          Cari Resi
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    couriers: Array,
    formData: Object,
    handleSubmit: Function,
  },
  computed: {
    isValid: function () {
      return this?.formData?.code?.length && this?.formData?.courier
    },
  },
}
</script>
