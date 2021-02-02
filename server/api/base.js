import bodyParser from 'body-parser'
import baseApi from '../../lib/api.json'
import ResponseInitiator from '../services/response'
import express from 'express'

// initialize express app
const base = express()

/**
 * Get all courier support data from base
 */
const couriers = async (req, res) => {
  const { search } = req.query
  let courierData = baseApi.map((itm) => {
    return itm.couriers.map((cr) => {
      return {
        sig: itm.sig,
        path: itm.path,
        label: cr.label,
        value: cr.value,
        icon: cr.icon,
      }
    })
  })
  courierData = courierData.flat()
  courierData = search
    ? courierData.filter((itm) => itm.value.includes(search))
    : courierData
  res.send(new ResponseInitiator().success().create(courierData))
  return res.end()
}

/**
 * Serverless start
 */
base.use(bodyParser.json())
base.all('/', couriers)

module.exports = base
