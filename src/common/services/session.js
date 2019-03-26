import angular from 'angular'
import _ from 'lodash'

angular.module('odin.common').factory('Session', Session)

Session.$inject = ['StorageService', '$rootScope', '$q', 'jwtHelper']
function Session(StorageService, $rootScope, $q, jwtHelper) {
  let _data = null
  const service = {
    load: load,
    data: data,
    set: set,
    update: update,
    clear: clear,
    expired: expired,
    required: required
  }

  return service

  // load the saved data into memory
  function load() {
    return StorageService.get($rootScope.sessionKey).then(function(data) {
      _data = data || {}
      $rootScope.$emit('Session:loaded')
      return _data
    })
  }

  // return the data or a specific property
  function data(property) {
    if (!property) return _data
    return _.get(_data, property)
  }

  // replace session data and cache in memory
  function set(data) {
    return StorageService.set($rootScope.sessionKey, data).then(load)
  }

  // update session data and cache in memory
  function update(data) {
    return set(_.assign({}, _data, data)).then(function(merged) {
      $rootScope.$emit('Session:updated')
      return merged
    })
  }

  // remove the session data
  function clear() {
    return StorageService.clear($rootScope.sessionKey)
      .then(load)
      .then(function() {
        $rootScope.$emit('Session:cleared')
      })
  }

  function expired() {
    return data('token') ? jwtHelper.isTokenExpired(data('token')) : true
  }

  function required() {
    const promise = _.isEmpty(_data) ? load() : $q.when(_data)
    return promise
      .then(function() {
        if (!expired()) return true
        return clear().then(function() {
          return $q.reject('sessionRequired')
        })
      })
      .catch(function(error) {
        return $q.reject(error)
      })
  }
}
