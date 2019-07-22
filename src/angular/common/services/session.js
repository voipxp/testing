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
  async function load() {
    const data = await StorageService.get($rootScope.sessionKey)
    _data = data || {}
    $rootScope.$emit('Session:loaded')
    console.log('Session:loaded', _data)
    return _data
  }

  // return the data or a specific property
  function data(property) {
    if (_.isEmpty(_data)) {
      _data = JSON.parse(localStorage.getItem($rootScope.sessionKey))
    }
    return property ? _.get(_data, property) : _data
  }
  // replace session data and cache in memory
  function set(data) {
    return StorageService.set($rootScope.sessionKey, data).then(load)
  }

  // update session data and cache in memory
  function update(data) {
    return set(_.assign({}, _data, data))
  }

  // remove the session data
  async function clear() {
    await StorageService.clear($rootScope.sessionKey)
    await load()
    $rootScope.$emit('Session:cleared')
  }

  function expired() {
    return data('token') ? jwtHelper.isTokenExpired(data('token')) : true
  }

  async function required() {
    if (_.isEmpty(_data)) await load()
    if (expired()) {
      await clear()
      throw new Error('sessionRequired')
    }
  }
}
