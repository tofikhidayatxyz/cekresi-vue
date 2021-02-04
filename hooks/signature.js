import CryptoJS from 'crypto-js'

/**
 *
 * @param {*} payload {}
 */
export const encodeSignature = (payload) => {
  const stringPayload = JSON.stringify(payload)
  const encryptedKey = CryptoJS.AES.encrypt(
    stringPayload,
    process.env.APP_KEY
  ).toString()
  return encryptedKey
}

export const decodeSignature = (encrypted) => {
  return new Promise((resolve, reject) => {
    const decryptByte = CryptoJS.AES.decrypt(encrypted, process.env.APP_KEY)
    let decryptedText = null
    try {
      decryptedText = decryptByte.toString(CryptoJS.enc.Utf8)
    } catch (e) {
      decryptedText = null
    }
    if (decryptedText) {
      resolve(JSON.parse(decryptedText))
    } else {
      reject({})
    }
  })
}

export const encodeUrlId = (payload) => {
  const stringPayload = JSON.stringify(payload)
  const encryptedKey = CryptoJS.AES.encrypt(
    stringPayload,
    process.env.URL_ENCODE_KEY
  ).toString()
  return encryptedKey
}

export const decodeUrlId = (payload) => {
  const stringPayload = JSON.stringify(payload)
  const encryptedKey = CryptoJS.AES.decrypt(
    stringPayload,
    process.env.URL_ENCODE_KEY
  ).toString()
  return encryptedKey
}
