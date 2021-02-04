export const getStorage = () => {
  const oldData = localStorage.getItem('history')
  return oldData ? JSON.parse(oldData) : []
}

export const setStorage = (data) => {
  const oldData = getStorage()
  const hasFound = oldData.find((itm) => itm.code == data.code)
  if (!hasFound) {
    const newData = [...oldData, data]
    localStorage.setItem('history', JSON.stringify(newData))
  }
}

export const removeStorage = (code) => {
  const oldData = getStorage()
  const newData = oldData.filter((itm) => itm.code !== code)
  localStorage.setItem('history', JSON.stringify(newData || []))
}
