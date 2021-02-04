<template>
  <div class="main-resi w-100">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <search-receipt-component
            :couriers="couriers"
            :formData="form"
            :handleSubmit="fetchData"
          />
          <history-copy-component v-if="copyUri" :url="copyUri" />
          <!-- history -->
          <history-receipt-component
            :oldHistory="oldHistory"
            :deleteHistory="deleteHistory"
            :deleteAllHistory="deleteAllHistory"
            :setForm="setForm"
          />
        </div>
        <div class="col-md-8">
          <div v-if="doneFetch && data.code">
            <history-detail-component :data="data" :formData="form" />
            <history-data-component :data="data" />
          </div>

          <div v-else-if="!data.code && !doneFetch">
            <div class="w-100 no-resi-found">
              <div
                class="ml-auto mr-auto d-flex align-items-center flex-column justify-content-center"
              >
                <i class="bx bx-search-alt text-primary"></i>
                <h2 class="text-center text-primary font-weight-bold">
                  Cari Resi Kamu
                </h2>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="w-100 no-resi-found">
              <div
                class="ml-auto mr-auto d-flex align-items-center flex-column justify-content-center"
              >
                <i class="bx bx-search text-primary"></i>
                <h2 class="text-center text-primary font-weight-bold">Ooops</h2>
                <p class="text-center">Nomor Resi Atau Kurir Salah</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { encodeSignature } from '~/hooks/signature'
import SearchReceiptComponent from '~/components/receipt/form-receipt'
import HistoryReceiptComponent from '~/components/receipt/history'
import HistoryDetailComponent from '~/components/receipt/detail'
import HistoryDataComponent from '~/components/receipt/history-data'
import HistoryCopyComponent from '~/components/receipt/copy'
import { getStorage, setStorage, removeStorage } from '~/hooks/storage'

export default {
  components: {
    SearchReceiptComponent,
    HistoryReceiptComponent,
    HistoryDetailComponent,
    HistoryDataComponent,
    HistoryCopyComponent,
  },
  data() {
    return {
      doneFetch: false,
      loading: true,
      loadingReceipt: true,
      couriers: [],
      form: {
        courier: null,
        code: null,
      },
      data: {},
      oldHistory: [],
      loadingHistory: true,
      copyUri: false,
    }
  },
  methods: {
    deleteHistory(e, code) {
      e.stopPropagation()
      e.preventDefault()
      removeStorage(code)
      this.oldHistory = getStorage()
    },
    deleteAllHistory() {
      localStorage.setItem('history', JSON.stringify([]))
      this.oldHistory = getStorage()
    },
    setForm(courier, code) {
      this.form = {
        courier,
        code,
      }
      // refetch
      this.fetchData()
    },
    generateSignature(signature = null) {
      return encodeSignature({
        created_at: moment().format(),
        valid_until: moment().add(1, 'minutes').format(),
        signature: signature || 'none',
      })
    },
    fetchCourier() {
      this.loading = true
      this.$axios
        .post(
          process.env.API_URL + '/couriers',
          {},
          {
            headers: {
              'X-APP-TOKEN': this.generateSignature(),
            },
          }
        )
        .then(({ data }) => {
          this.couriers = data?.data || []
        })
        .catch((e) => {
          console.error(e)
        })
        .then(() => {
          this.loading = false
          this.setupByPage()
        })
    },
    fetchData(e) {
      // this.setOldHistory({
      //   courier: this.form.courier,
      //   code: this.form.code,
      // })
      this.doneFetch = false
      this.loadingReceipt = true
      e?.stopPropagation()
      e?.preventDefault()
      this.$axios
        .post(
          process.env.API_URL + '/receipt/' + this.form.courier.signature,
          {
            courier: this.form.courier.value,
            code: this.form.code,
          },
          {
            headers: {
              'X-APP-TOKEN': this.generateSignature(
                this.form?.courier?.signature
              ),
            },
          }
        )
        .then(({ data }) => {
          this.data = data?.data
          this.copyUri = `${window.location.origin}/${this.form.courier.signature}?courier=${this.form.courier.value}&code=${this.form.code}`
          // attack to storage
          setStorage({
            code: this.form.code,
            courier: this.form.courier,
            createdAt: moment().format(),
          })
          this.oldHistory = getStorage()
        })
        .catch((e) => {
          this.data = {
            shipper: {},
            consignee: {},
            history: [],
          }
          console.log(e)
          alert(`Some Error hmm ${JSON.stringify(e?.response?.data)}`)
        })
        .then(() => {
          this.loadingReceipt = false
          this.doneFetch = true
        })
    },
    setupByPage() {
      console.log(this.$route)
      const signatureParam = this.$route.params.signature
      const valueQuery = this.$route.query.courier
      const codeQuery = this.$route.query.code
      const courierData = this.couriers.find(
        (itm) => itm.signature == signatureParam && itm.value == valueQuery
      )
      if (courierData) {
        this.form = {
          code: codeQuery,
          courier: courierData,
        }
        this.fetchData()
      }
    },
  },
  mounted() {
    this.fetchCourier()
    this.oldHistory = getStorage()
    // setup
  },
}
</script>

<style lang="scss">
.history-parent {
  .history-icon {
    width: 40px;
    flex: 0 0 40px;
    display: flex;
    align-items: center;
    span {
      height: 10px;
      width: 10px;
      background-color: var(--primary);
      border-radius: 100%;
      display: block;
      margin-top: 6px;
    }
  }
  .history-data {
    max-width: calc(100% - 40px);
    flex: 0 0 calc(100% - 40px);
  }
  .history-list {
    position: relative;
    &:not(:last-child) {
      margin-bottom: 30px;
      &::before {
        height: 100%;
        width: 2px;
        content: '';
        left: 4px;
        background-color: var(--primary);
        display: block;
        position: absolute;
        bottom: calc(-50% - 15px);
      }
    }
  }
}
.main-resi {
  margin-top: 40px;
}
.list-history {
  .bx {
    font-size: 20px;
  }
}
.detail-shippment {
  .detail-list {
    &:not(:first-child) {
      margin-top: 15px;
    }
  }
  .detail-title {
    flex: 0 0 170px;
  }
  .detail-space {
    flex: 0 0 20px;
  }
}
.no-resi-found {
  i {
    font-size: 120px;
  }
}
</style>
