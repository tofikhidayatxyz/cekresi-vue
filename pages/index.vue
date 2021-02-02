<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-4 pt-4">
            <div class="card">
              <div class="card-header bg-primary">
                <h5 class="mb-0 text-white">Courier</h5>
              </div>
              <div class="card-body p-0">
                <ul class="list-group list-group-flush" v-if="!loading">
                  <li
                    class="list-group-item"
                    v-for="(itm, key) in couriers"
                    :key="key"
                  >
                    <div class="custom-control custom-radio">
                      <input
                        type="radio"
                        :id="itm.value"
                        name="courier"
                        class="custom-control-input"
                        v-model="form.courier"
                      />
                      <label class="custom-control-label" :for="itm.value">{{
                        itm.label
                      }}</label>
                    </div>
                  </li>
                </ul>
                <div v-else>
                  <h5 class="text-center text-warning my-3">Loading ...</h5>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8 pt-4">
            <div class="w-100">
              <form action="?" @submit="fetchHistory">
                <div class="d-flex">
                  <input
                    type="text"
                    class="form-control"
                    name="search"
                    placeholder="Type Resi Here ..."
                    v-model="form.code"
                  />
                  <button class="btn btn-primary ml-3" type="submit">
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div class="w-100">
              <div v-if="!loadingReceipt">
                <div class="card mt-4">
                  <table class="table mb-0">
                    <tr>
                      <td>Code</td>
                      <td>:</td>
                      <td>{{ data.code || '-' }}</td>
                    </tr>
                    <tr>
                      <td>Shipper Name</td>
                      <td>:</td>
                      <td>{{ data.shipper.name || '-' }}</td>
                    </tr>
                    <tr>
                      <td>Shipper Address</td>
                      <td>:</td>
                      <td>{{ data.shipper.address || '-' }}</td>
                    </tr>
                    <tr>
                      <td>Service</td>
                      <td>:</td>
                      <td>{{ data.service || '-' }}</td>
                    </tr>
                    <tr>
                      <td>Origin</td>
                      <td>:</td>
                      <td>{{ data.origin || '-' }}</td>
                    </tr>
                    <tr>
                      <td>Destination</td>
                      <td>:</td>
                      <td>{{ data.destination || '-' }}</td>
                    </tr>
                    <tr>
                      <td>Consignee Name</td>
                      <td>:</td>
                      <td>{{ data.consignee.name || '-' }}</td>
                    </tr>
                    <tr>
                      <td>Consignee Address</td>
                      <td>:</td>
                      <td>{{ data.consignee.address || '-' }}</td>
                    </tr>
                    <tr>
                      <td>Date Shipment</td>
                      <td>:</td>
                      <td>{{ data.date_shipment || '-' }}</td>
                    </tr>
                    <tr>
                      <td>Date Received</td>
                      <td>:</td>
                      <td>{{ data.date_received || '-' }}</td>
                    </tr>
                    <tr>
                      <td>Receiver</td>
                      <td>:</td>
                      <td>{{ data.receiver || '-' }}</td>
                    </tr>
                    <tr>
                      <td>current_position</td>
                      <td>:</td>
                      <td>{{ data.current_position || '-' }}</td>
                    </tr>
                  </table>
                </div>
                <div class="w-100 mt-4 pb-5">
                  <h5>History</h5>
                  <div
                    class="card mt-3"
                    v-for="(itm, key) in data.history"
                    :key="key"
                  >
                    <div class="card-body">
                      <h4>{{ itm.position }}</h4>
                      <p>{{ itm.desc }}</p>
                      <span>{{ itm.time }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 pt-4">
        <div class="card">
          <div class="card-header bg-primary">
            <h5 class="mb-0 text-white">History</h5>
          </div>
          <div class="card-body p-0">
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item"
                v-for="(itm, key) in oldHistory"
                :key="key"
                @click.prevent="(e) => getFromHitory(itm)"
              >
                <h5 class="mb-0">{{ itm.code }}</h5>
                <h6 class="mb-0">{{ itm.courier }}</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import moment from 'moment'
export default {
  data() {
    return {
      loading: true,
      loadingReceipt: true,
      couriers: [],
      form: {
        courier: null,
        code: null
      },
      data: {},
      oldHistory: [],
      loadingHistory: true
    }
  },
  methods: {
    getApiUrl(apiText) {
      if(typeof window !== 'undefined') {
        console.log(process.env.API_URL)
        return process.env.API_URL + '/' + apiText
      }
      return apiText
    },
    getFromHitory(formCode) {
      this.form = formCode
      this.fetchHistory()
    },
    fetchOldHistory() {
      let oldData = localStorage.getItem('old-histories')
      oldData = oldData ? JSON.parse(oldData) : []
      this.oldHistory = oldData
      this.loadingHistory = false
    },
    setOldHistory({courier, code}) {
      let oldData = localStorage.getItem('old-histories')
      oldData = JSON.parse(oldData) || []
      const hasFound = oldData?.find(itm  => itm.code == code)

      if(!hasFound) {
        const newData = [...oldData, {
          courier: courier,
          code: code
        }]
        localStorage.setItem('old-histories', JSON.stringify(newData))
      }
    },
    fetchCourier() {
      this.loading = true
      this.$axios.get(this.getApiUrl('base'))
          .then(({data}) => {
            console.log(data)
            this.couriers = data?.data || []
          })
          .catch(e => {
            console.error(e)
          })
          .then(() => {
            this.loading = false
          })
    },
    getCourier(courierCode) {
      return this.couriers.find(itm => itm.value == courierCode)
    },
    fetchHistory(e) {
      this.setOldHistory({
        courier: this.form.courier,
        code: this.form.code
      })
      this.loadingReceipt = true
      e?.stopPropagation()
      e?.preventDefault()
      const courier = this.getCourier('jnt')
      this.$axios.post(this.getApiUrl(`${courier?.sig}`), {
        courier: this.form.courier,
        code: this.form.code
      })
      .then(({data}) => {
        this.data = data?.data
      })
      .catch(e => {
        this.data = {
          shipper: {},
          consignee: {},
          history: []
        }
        alert('Some Error hmm')
      })
      .then(() => {
        this.loadingReceipt = false
      })
    }
  },
  mounted() {
    this.fetchCourier()
    this.fetchOldHistory()
  }
}
</script>
