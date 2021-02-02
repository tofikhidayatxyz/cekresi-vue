import bodyParser from 'body-parser'
import baseApi from '../../lib/api.json'
import express, { Request, Response } from 'express'
import ResponseInitiator from '../services/response'

// initialize express app
const base = express()

/**
 * Make interface
 */
interface Courier {
  sig: string
  label: string
  value: string
  icon: string
  path: string
}

interface Param {
  search?: string
}

// console.log(baseApi)

/**
 * Get all courier support data from base
 */
const couriers = async (req: Request, res: Response) => {
  const { search }: Param = req.query
  let courierData: any = baseApi.map((itm: any) => {
    return itm.couriers.map((cr: Courier) => {
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
    ? courierData.filter((itm: Courier) => itm.value.includes(search))
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
