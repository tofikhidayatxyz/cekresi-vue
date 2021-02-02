import { ApiData } from './apis.d'

const apiData = [
  {
    namespace: '/api/v1/',
    sig: '5805dd5dc74dcf53740ab1ca99d61387',
    handler: '~server/api/resi-id.ts',
    alias: 'resi.id',
    couriers: [
      {
        label: 'JNE',
        value: 'jne',
        icon: 'jne.svg',
      },
      {
        label: 'JNT',
        value: 'jnt',
        icon: 'jnt.svg',
      },
      {
        label: 'TIKI',
        value: 'tiki',
        icon: 'tiki.svg',
      },
      {
        label: 'SICEPAT',
        value: 'sicepat',
        icon: 'sicepat.svg',
      },
      {
        label: 'POS INDONESIA',
        value: 'pos',
        icon: 'pos.svg',
      },
      {
        label: 'DPEX',
        value: 'dpex',
        icon: 'dpex.svg',
      },
      {
        label: 'REX',
        value: 'rex',
        icon: 'rex.svg',
      },
      {
        label: 'RPX',
        value: 'rpx',
        icon: 'rpx.svg',
      },
      {
        label: 'SAP',
        value: 'sap',
        icon: 'sap.svg',
      },
      {
        label: 'WAHANA',
        value: 'wahana',
        icon: 'wahana.svg',
      },
      {
        label: 'LION PARCEL',
        value: 'lionparcel',
        icon: 'lionparcel.svg',
      },
    ],
  },
]

/**
 * Export and set path
 */
export default apiData.map((itm) => {
  itm?.path = itm.namespace + itm.sig
  return itm
})
