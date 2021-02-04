<template>
  <div class="card mt-4">
    <div class="card-header bg-primary">
      <h5 class="text-white mb-0">Copy Url</h5>
    </div>
    <div class="card-body">
      <div class="w-100">
        <div class="alert alert-primary" v-if="doneCopy">
          Successfull Coppied
        </div>
        <input
          type="text"
          readonly
          class="form-control bg-white shadow-none"
          :value="url"
          ref="inputRef"
        />
      </div>
      <div class="w-100 mt-4">
        <button
          class="btn btn-primary btn-block text-white d-flex align-items-center justify-content-center"
          @click="copy"
        >
          <i class="bx bx-link"></i> Salin URL
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
  },
  data() {
    return {
      doneCopy: false,
    }
  },
  methods: {
    copy() {
      this.$refs.inputRef.select()
      document.execCommand('copy')
      this.doneCopy = true
      setTimeout(() => {
        this.doneCopy = false
      }, 2000)
    },
  },
}
</script>
<style lang="scss" scoped>
i {
  font-size: 18px;
}
</style>
