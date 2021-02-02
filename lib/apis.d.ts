export interface Courier {
  label: string
  value: string
  icon: string
}

export interface ApiData {
  path?: string
  namespace: string
  sig: string
  handler: string
  alias: string
  couriers: Array<Courier>
}
