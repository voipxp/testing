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
import { get, camelCase } from 'lodash'
import angular from 'angular'

angular.module('odin.common').factory('Module', Module)

Module.$inject = ['Session', '$q', '$ngRedux']
function Module(Session, $q, $ngRedux) {
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
  return service

  function modules() {
    return $ngRedux.getState().ui.modules
  }

  function load() {
    return $q.when(modules())
  }

  function show(name) {
    return $q.when(findByName(name))
  }

  // find the module by name and then map it to the
  // user for this session
  // TODO: map it this way in redux
  function findByName(name) {
    const moduleName = name.serviceName || name.name || name
    const module = modules()[moduleName]
    if (!module) return { permissions: {} }
    const permissions = module.permissions[camelCase(Session.data('loginType'))]
    return { ...module, permissions }
  }

  function name(name) {
    return get(findByName(name), 'name')
  }

  function alias(name) {
    return get(findByName(name), 'alias', name)
  }

  function description(name) {
    return get(findByName(name), 'description')
  }

  function url(name) {
    return get(findByName(name), 'url')
  }

  function permissions(name) {
    return get(findByName(name), 'permissions', {})
  }

  function create(name) {
    return get(findByName(name), 'permissions.create', false)
  }

  function read(name) {
    return get(findByName(name), 'permissions.read', false)
  }

  function update(name) {
    return get(findByName(name), 'permissions.update', false)
  }

  function destroy(name) {
    return get(findByName(name), 'permissions.delete', false)
  }

  async function allow(name) {
    await load()
    return read(name) ? findByName(name) : $q.reject('moduleAllow')
  }
}
