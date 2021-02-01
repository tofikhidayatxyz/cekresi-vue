import bodyParser from 'body-parser'
import express from 'express'
import FormData from 'form-data'
import axios from 'axios'
const app = express()

const formUrlEncoded = (x) =>
  Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')

const getResi = (courier, code) => {
  return new Promise((resolve, reject) => {
    const form = new FormData()
    form.append('kurir', courier)
    form.append('resi', code)
    // console.log(form)
    axios
      .request({
        method: 'POST',
        url: 'https://pluginongkoskirim.com/cek-tarif-ongkir/front/resi-amp',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.20 Safari/537.36',
          refer: 'referer',
          origin: 'https://pluginongkoskirim.com',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: formUrlEncoded({
          kurir: courier,
          resi: code,
        }),
      })
      .then(({ data }) => {
        // console.log(data)
        if (data.error) {
          return reject(data)
        } else {
          const det = data.data.detail
          return resolve({
            code: det.code,
            shipper: det.shipper,
            service: det.service,
            origin: det.origin,
            destination: det.destination,
            consignee: det.consignee,
            date_shipment: det.date_shipment,
            date_received: det.date_received,
            receiver: det.receiver,
            current_position: det.current_position,
            history: dets.history,
          })
        }
      })
      .catch((err) => {
        // console.log(err)
        return reject(err)
      })
  })
}

app.use(bodyParser.json())
app.post('/', (req, res) => {
  const { code, courier } = req.body
  getResi(courier, code)
    .then((data) => {
      console.log(data)
      res.json(data)
    })
    .catch((e) => {
      console.log(e)
      res.status(400)
      res.json({
        message: e,
      })
    })
  // res.end()
})

module.exports = app
