import angular from 'angular'
import _ from 'lodash'

angular.module('odin.app').factory('Route', Route)

Route.$inject = ['APP', '$location', 'Session']
function Route(APP, $location, Session) {
  return {
    api: api,
    path: path,
    open: open,
    login: login,
    dashboard: dashboard
  }
  function encoded(prefixes, args) {
    const components = args.map(function(arg) {
      if (arg) return encodeURISegment(arg)
    })
    return _.compact(prefixes.concat(components)).join('/')
  }
  function encodeURISegment(val) {
    return encodeURIQuery(val, true)
      .replace(/%26/gi, '&')
      .replace(/%3D/gi, '=')
      .replace(/%2B/gi, '+')
  }
  function encodeURIQuery(val, pctEncodeSpaces) {
    return encodeURIComponent(val)
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
    prefixes.unshift(APP.apiURL)
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
    return $location.path(APP.loginURL)
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
        route = [APP.loginURL]
    }
    return open.apply(null, route).hash(null)
  }
}

export default Route
