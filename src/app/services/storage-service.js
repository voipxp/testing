import angular from 'angular'
import localforage from 'localforage'

angular.module('odin.app').factory('StorageService', StorageService)

StorageService.$inject = ['$q']
function StorageService($q) {
  const service = { get: get, set: set, clear: clear }
  return service

  function clear(key) {
    return $q(function(resolve, reject) {
      localforage.removeItem(key, function(error) {
        if (error) return reject(error)
        resolve(key)
      })
    })
  }

  function get(key) {
    return $q(function(resolve, reject) {
      localforage.getItem(key, function(error, data) {
        if (error) return reject(error)
        resolve(data)
      })
    })
  }

  function set(key, value) {
    return $q(function(resolve, reject) {
      localforage.setItem(key, value, function(error) {
        if (error) return reject(error)
        resolve(key)
      })
    })
  }
}
