import angular from 'angular'
import _ from 'lodash'
import { SESSION_QUERY } from '@/graphql'

angular.module('odin.common').factory('Session', Session)

Session.$inject = ['$rootScope', '$q', 'jwtHelper', 'GraphQL']
function Session($rootScope, $q, jwtHelper, GraphQL) {
  let _data = null
  const service = {
    load: load,
    data: data,
    set: set,
    clear: clear,
    expired: expired,
    required: required
  }

  GraphQL.watchQuery(
    {
      query: SESSION_QUERY,
      fetchPolicy: 'cache-only',
      notifyOnNetworkStatusChange: true,
      returnPartialData: true
    },
    data => (_data = data.session || {})
  )

  $rootScope.$on()

  return service

  // this is now a noop because we are subscribing
  async function load() {
    console.log('Session.load DEPRECATED')
    $rootScope.$emit('Session:loaded')
    return _data
  }

  // return the data or a specific property
  function data(property) {
    return property ? _.get(_data, property) : _data
  }
  // replace session data and cache in memory
  function set(data) {
    console.log('Session.set DEPRECATED')
  }

  // remove the session data
  async function clear() {
    console.log('Session.clear DEPRECATED')
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
