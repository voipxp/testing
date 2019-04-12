import angular from 'angular'
import _ from 'lodash'
import { setSession, clearSession } from '/store/session'

angular.module('odin.common').factory('Session', Session)

Session.$inject = [
  'StorageService',
  '$rootScope',
  '$q',
  'jwtHelper',
  '$ngRedux'
]
function Session(StorageService, $rootScope, $q, jwtHelper, $ngRedux) {
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
    return $ngRedux.getState().session
  }

  // return the data or a specific property
  function data(property) {
    const session = $ngRedux.getState().session
    return property ? _.get(session, property) : session
  }

  // replace session data and cache in memory
  async function set(data) {
    await StorageService.set($rootScope.sessionKey, data)
    $ngRedux.dispatch(setSession(data))
  }

  // update session data and cache in memory
  function update(data) {
    const current = $ngRedux.getState().session
    set({ ...current, data })
  }

  // remove the session data
  async function clear() {
    await StorageService.clear($rootScope.sessionKey)
    $ngRedux.dispatch(clearSession())
    $rootScope.$emit('Session:cleared')
  }

  function expired() {
    return data('token') ? jwtHelper.isTokenExpired(data('token')) : true
  }

  async function required() {
    if (expired()) return $q.reject('sessionRequired')
  }
}
