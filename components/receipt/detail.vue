<template>
  <div class="w-100">
    <div class="w-100">
      <div class="row">
        <div class="col-md-3 col-6">
          <span class="text-dark">Nomor Resi</span>
          <p class="mb-0 font-weight-bold">{{ data.code || '-' }}</p>
        </div>
        <div class="col-md-3 col-6">
          <span class="text-dark">Kurir</span>
          <p class="mb-0 font-weight-bold">
            {{ formData.courier.label || '-' }}
          </p>
        </div>
        <div class="col-md-3 col-6 mt-3 mt-md-0">
          <span class="text-dark">Pelayanan</span>
          <p class="mb-0 font-weight-bold">{{ data.service || '-' }}</p>
        </div>
        <div class="col-md-3 col-6 mt-3 mt-md-0">
          <span class="text-dark">Status</span>
          <p class="mb-0 font-weight-bold">
            {{ data.date_received ? 'Di Terima' : 'Dalam Perjalanan' }}
          </p>
        </div>
      </div>
    </div>
    <div class="w-100 detail-shippment mt-4">
      <div class="detail-list d-flex">
        <div class="detail-title">
          <span class="font-weight-bold">Nama Pengirim</span>
        </div>
        <div class="detail-space">
          <span class="font-weight-bold">:</span>
        </div>
        <div class="detail-desc">
          <span class="text-dark">{{ data.shipper.name || '-' }}</span>
        </div>
      </div>
      <div class="detail-list d-flex">
        <div class="detail-title">
          <span class="font-weight-bold">Alamat Pengirim</span>
        </div>
        <div class="detail-space">
          <span class="font-weight-bold">:</span>
        </div>
        <div class="detail-desc">
          <span class="text-dark">{{ data.shipper.address || '-' }}</span>
        </div>
      </div>
      <div class="detail-list d-flex">
        <div class="detail-title">
          <span class="font-weight-bold">Nama Penerima</span>
        </div>
        <div class="detail-space">
          <span class="font-weight-bold">:</span>
        </div>
        <div class="detail-desc">
          <span class="text-dark">{{ data.consignee.name || '-' }}</span>
        </div>
      </div>
      <div class="detail-list d-flex">
        <div class="detail-title">
          <span class="font-weight-bold">Alamat Penerima</span>
        </div>
        <div class="detail-space">
          <span class="font-weight-bold">:</span>
        </div>
        <div class="detail-desc">
          <span class="text-dark">{{ data.consignee.address || '-' }}</span>
        </div>
      </div>
      <div class="detail-list d-flex">
        <div class="detail-title">
          <span class="font-weight-bold">Dari</span>
        </div>
        <div class="detail-space">
          <span class="font-weight-bold">:</span>
        </div>
        <div class="detail-desc">
          <span class="text-dark">{{ data.origin || '-' }}</span>
        </div>
      </div>
      <div class="detail-list d-flex">
        <div class="detail-title">
          <span class="font-weight-bold">Destinasi</span>
        </div>
        <div class="detail-space">
          <span class="font-weight-bold">:</span>
        </div>
        <div class="detail-desc">
          <span class="text-dark">{{ data.destination || '-' }}</span>
        </div>
      </div>
      <div class="detail-list d-flex">
        <div class="detail-title">
          <span class="font-weight-bold">Waktu Kirim</span>
        </div>
        <div class="detail-space">
          <span class="font-weight-bold">:</span>
        </div>
        <div class="detail-desc">
          <span class="text-dark">{{ data.date_shipment || '-' }}</span>
        </div>
      </div>
      <div class="detail-list d-flex">
        <div class="detail-title">
          <span class="font-weight-bold">Waktu Sampai</span>
        </div>
        <div class="detail-space">
          <span class="font-weight-bold">:</span>
        </div>
        <div class="detail-desc">
          <span class="text-dark">{{ data.date_received || '-' }}</span>
        </div>
      </div>
      <div class="detail-list d-flex">
        <div class="detail-title">
          <span class="font-weight-bold">Penerima</span>
        </div>
        <div class="detail-space">
          <span class="font-weight-bold">:</span>
        </div>
        <div class="detail-desc">
          <span class="text-dark">{{ data.receiver || '-' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    formData: Object,
  },
}
</script>
