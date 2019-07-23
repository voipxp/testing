import angular from 'angular'
import _ from 'lodash'
import { SESSION_QUERY } from '@/graphql'

angular.module('odin.common').factory('Session', Session)

Session.$inject = ['StorageService', '$rootScope', '$q', 'jwtHelper', 'GraphQL']
function Session(StorageService, $rootScope, $q, jwtHelper, GraphQL) {
  let _data = null
  const service = {
    load: load,
    data: data,
    set: set,
    clear: clear,
    expired: expired,
    required: required
  }

  GraphQL.watchQuery({ query: SESSION_QUERY }, data => {
    console.log('inCallback', data)
  })

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
    console.log('Session.set DEPRECATED')
    // return StorageService.set($rootScope.sessionKey, data).then(load)
  }

  // remove the session data
  async function clear() {
    console.log('Session.clear DEPRECATED')
    // await StorageService.clear($rootScope.sessionKey)
    // await load()
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
