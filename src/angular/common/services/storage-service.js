import angular from 'angular'
import localforage from 'localforage'

angular.module('odin.common').factory('StorageService', StorageService)

StorageService.$inject = ['$q']
function StorageService($q) {
  const service = { get: get, set: set, clear: clear }
  return service

  function clear(key) {
    return $q((resolve, reject) => {
      localforage.removeItem(key, error => {
        return error ? reject(error) : resolve(key)
      })
    })
  }

  function get(key) {
    return $q((resolve, reject) => {
      localforage.getItem(key, (error, data) => {
        return error ? reject(error) : resolve(data)
      })
    })
  }

  function set(key, value) {
    return $q((resolve, reject) => {
      localforage.setItem(key, value, error => {
        return error ? reject(error) : resolve(key)
      })
    })
  }
}
