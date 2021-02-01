import bodyParser from 'body-parser'
import express from 'express'
import BaseApi from '../apis.json'
const app = express()

const curiers = () => {
  let courierData = BaseApi.map((itm) => {
    return itm.couriers.map((cr) => {
      return {
        sig: itm.sig,
        label: cr.label,
        value: cr.value,
      }
    })
  })
  courierData = courierData.flat()
  return courierData
}
app.use(bodyParser.json())
app.all('/', (req, res) => {
  res.json(curiers())
})

module.exports = app
