const get = (key) => {
  return new Promise( (resolve, reject) => {
    try {
      resolve(JSON.parse(localStorage.getItem(key)))
    } catch (error) {
      reject(error)
    }
  })
}

const set = (key, value) => {
  return new Promise( (resolve, reject) => {
    try {
      resolve(localStorage.setItem(key, JSON.stringify(value)))
    } catch (error) {
      reject(error)
    }
  })
}

const clear = (key) => {
  return new Promise( (resolve, reject) => {
    try {
      resolve(localStorage.removeItem(key))
    } catch (error) {
      reject(error)
    }
  })
}

export const StorageService = {
  getStorage: get,
  setStorage: set,
  clearStorage: clear
}
