import { decodeSignature } from '../../hooks/signature'
import moment from 'moment'
import ResponseInitiator from '../services/response'

export default async (req, res, next) => {
  const requestToken = req.headers['x-app-token'] || null
  decodeSignature(requestToken)
    .then((decodeToken) => {
      const isValidTime = moment(decodeToken?.valid_until).isAfter(moment())
      if (isValidTime) {
        req.signature = decodeToken?.signature
        return next()
      }
    })
    .catch((err) => {
      res.status(400)
      res.json(
        new ResponseInitiator().badRequest().create('Invalid request token')
      )
    })
}
