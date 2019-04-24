import angular from 'angular'

angular.module('odin.common').factory('StorageService', StorageService)

StorageService.$inject = ['$q']
function StorageService($q) {
  const service = { get: get, set: set, clear: clear }
  return service

  function clear(key) {
    return $q((resolve, reject) => {
      try {
        resolve(localStorage.removeItem(key))
      } catch (error) {
        reject(error)
      }
    })
  }

  function get(key) {
    return $q((resolve, reject) => {
      try {
        resolve(JSON.parse(localStorage.getItem(key)))
      } catch (error) {
        reject(error)
      }
    })
  }

  function set(key, value) {
    return $q((resolve, reject) => {
      try {
        resolve(localStorage.setItem(key, JSON.stringify(value)))
      } catch (error) {
        reject(error)
      }
    })
  }
}
