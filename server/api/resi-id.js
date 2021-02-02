import bodyParser from 'body-parser'
import express from 'express'
import ResponseInitiator from '../services/response'
import axios from 'axios'

// initialize express app
const resiId = express()
const apiUrl = 'https://pluginongkoskirim.com/cek-tarif-ongkir/front/resi-amp'
//
const formUrlEncoded = (x) =>
  Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
/**
 * Get all courier support data from base
 */

const getReceipt = (courier, code) => {
  return new Promise((resolve, reject) => {
    axios
      .request({
        method: 'POST',
        url: apiUrl,
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
            history: det.history,
          })
        }
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

const parseReceipt = (req, res) => {
  const { code, courier } = req.body
  getReceipt(courier, code)
    .then((data) => {
      // console.log(data)
      res.json(new ResponseInitiator().success().create(data))
      res.end()
    })
    .catch((e) => {
      console.log(e)
      res.status(400)
      res.json(
        new ResponseInitiator()
          .badRequest()
          .create('Receipt or courier is invalid')
      )
      res.end()
    })
}

/**
 * Serverless start
 */
resiId.use(bodyParser.json())
resiId.post('/', parseReceipt)

module.exports = resiId
