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
import get from 'lodash/get'
import camelCase from 'lodash/camelCase'
import angular from 'angular'
import { UI_MODULES_QUERY } from '@/graphql'

angular.module('odin.common').factory('Module', Module)

Module.$inject = ['Session', '$q', 'GraphQL']
function Module(Session, $q, GraphQL) {
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
  const _modules = []
  return service

  function modules() {
    return _modules
  }

  function load() {
    return GraphQL.query({ query: UI_MODULES_QUERY })
  }

  function show(name) {
    return $q.when(findByName(name))
  }

  // find the module by name and then map it to the
  // user for this session
  function findByName(name) {
    const moduleName = name.serviceName || name.name || name
    const module = modules().find(m => m.name === moduleName)
    if (!module) {
      return {
        name,
        alias: name,
        permissions: { create: true, read: true, update: true, delete: true }
      }
    }
    const loginType = Session.data()
    const permissions =
      loginType === 'System'
        ? { create: true, read: true, update: true, delete: true }
        : {
            create: module[camelCase(`${loginType}Create`)],
            read: module[camelCase(`${loginType}Read`)],
            update: module[camelCase(`${loginType}Update`)],
            delete: module[camelCase(`${loginType}Delete`)]
          }
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
