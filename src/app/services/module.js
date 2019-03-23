/*
TODO

Version
  When we add minimum version into the product master
  we should add version checking to all of these

isEnterprise
  Should we add something to determine if this only applies
  to enterprise customers?

Filter
  Pass in an array of services and filter the data based
  on the permissions

*/
import _ from 'lodash'
import angular from 'angular'

angular.module('odin.app').factory('Module', Module)

Module.$inject = [
  '$http',
  'Route',
  'Session',
  '$q',
  'CacheFactory',
  '$rootScope'
]
function Module($http, Route, Session, $q, CacheFactory, $rootScope) {
  const service = {
    load,
    allow,
    show,
    name,
    alias,
    description,
    url,
    permissions,
    create,
    read,
    update,
    delete: destroy
  }
  const route = Route.api('/ui/modules')
  const cache = CacheFactory('Module')
  let _modules = {}

  $rootScope.$on('BrandingHostnameService:updated', clearCache)
  $rootScope.$on('BrandingModuleService:updated', clearCache)
  return service

  function clearCache() {
    cache.removeAll()
  }

  function load() {
    return $http.get(route(), { cache }).then(function(response) {
      return mapModules(response.data)
    })
  }

  // turn into an easy to access hash
  // { 'Auto Attendant': { name: '', alias: '', permissions: { read: true } }}
  function mapModules(modules) {
    const newModules = {}
    modules.forEach(function(module) {
      module.permissions =
        module.permissions[_.camelCase(Session.data('loginType'))]
      newModules[module.name] = module
    })
    _modules = newModules
    return _modules
  }

  function show(name) {
    return load().then(function() {
      return get(name)
    })
  }

  function get(name) {
    const theName = name.serviceName || name.name || name
    return _.get(_modules, theName, { permissions: {} })
  }

  function name(name) {
    return _.get(get(name), 'name')
  }

  function alias(name) {
    return _.get(get(name), 'alias', name)
  }

  function description(name) {
    return _.get(get(name), 'description')
  }

  function url(name) {
    return _.get(get(name), 'url')
  }

  function permissions(name) {
    return _.get(get(name), 'permissions', {})
  }

  function create(name) {
    return _.get(get(name), 'permissions.create', false)
  }

  function read(name) {
    return _.get(get(name), 'permissions.read', false)
  }

  function update(name) {
    return _.get(get(name), 'permissions.update', false)
  }

  function destroy(name) {
    return _.get(get(name), 'permissions.delete', false)
  }

  function allow(name) {
    return load().then(function() {
      return read(name) ? get(name) : $q.reject('moduleAllow')
    })
  }
}
