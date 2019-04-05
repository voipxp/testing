import angular from 'angular'
import _ from 'lodash'

angular.module('odin.api').factory('Route', Route)

Route.$inject = ['$rootScope', '$location', 'Session']
function Route($rootScope, $location, Session) {
  return {
    api: api,
    path: path,
    open: open,
    login: login,
    dashboard: dashboard
  }
  function encoded(prefixes, arguments_) {
    const components = arguments_.map(function(argument) {
      if (argument) return encodeURISegment(argument)
    })
    return _.compact(prefixes.concat(components)).join('/')
  }
  function encodeURISegment(value) {
    return encodeURIQuery(value, true)
      .replace(/%26/gi, '&')
      .replace(/%3D/gi, '=')
      .replace(/%2B/gi, '+')
  }
  function encodeURIQuery(value, pctEncodeSpaces) {
    return encodeURIComponent(value)
      .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%3B/gi, ';')
      .replace(/%20/g, pctEncodeSpaces ? '%20' : '+')
  }
  function api() {
    const prefixes = Array.prototype.slice.call(arguments)
    prefixes[0] = prefixes[0] && prefixes[0].replace(/^\//, '')
    prefixes.unshift($rootScope.apiURL)
    return function generateURL() {
      return encoded(prefixes, Array.prototype.slice.call(arguments))
    }
  }
  function path() {
    const prefixes = Array.prototype.slice.call(arguments)
    prefixes[0] = prefixes[0] && prefixes[0].replace(/^([^/])/, '/$1')
    return function generateURL() {
      return encoded(prefixes, Array.prototype.slice.call(arguments))
    }
  }
  function open() {
    const parts = Array.prototype.slice.call(arguments)
    return $location
      .path(_.compact(parts).join('/'))
      .search({})
      .hash(null)
  }
  // redirect to login
  function login() {
    return $location.path($rootScope.loginURL)
  }
  // redirect the user based on loginType
  function dashboard() {
    const serviceProviderId = Session.data('serviceProviderId')
    const groupId = Session.data('groupId')
    const userId = Session.data('userId')
    const loginType = Session.data('loginType')
    if (!loginType) return login()
    let route
    switch (loginType) {
      case 'System':
        route = ['system']
        break
      case 'Provisioning':
        route = ['system']
        break
      case 'Service Provider':
        route = ['serviceProviders', serviceProviderId]
        break
      case 'Group':
        route = ['groups', serviceProviderId, groupId]
        break
      case 'User':
        route = ['users', serviceProviderId, groupId, userId]
        break
      default:
        route = [$rootScope.loginURL]
    }
    return open.apply(null, route).hash(null)
  }
}

export default Route