;(function() {
  angular
    .module('odin.common')
    .factory('GroupDepartmentService', GroupDepartmentService)

  function GroupDepartmentService($http, CacheFactory, Route) {
    var cache = CacheFactory('GroupDepartmentService')
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy,
      fromId: fromId,
      toId: toId
    }
    return service

    function url(serviceProviderId, groupId, name, parents) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('departments', name, parents)
    }

    function index(serviceProviderId, groupId, includeEnterprise) {
      return $http
        .get(url(serviceProviderId, groupId), {
          cache: cache,
          params: { includeEnterprise: includeEnterprise }
        })
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, object) {
      return $http
        .post(url(serviceProviderId, groupId), object)
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }

    function show(serviceProvierId, groupId, name) {
      return $http
        .get(url(serviceProvierId, groupId, name))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, name, department) {
      return $http
        .put(url(serviceProviderId, groupId, name), department)
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, name) {
      return $http
        .delete(url(serviceProviderId, groupId, name))
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }

    function fromId(key) {
      if (_.isObject(key)) return key
      var parts = key.split('+')
      if (parts.length === 2) {
        return {
          serviceProviderId: parts[0],
          name: parts[1]
        }
      } else if (parts.length === 3) {
        return {
          serviceProviderId: parts[0],
          groupId: parts[1],
          name: parts[2]
        }
      }
    }

    function toId(department) {
      if (!department) return
      if (_.isString(department)) return department
      var parts = [
        department.serviceProviderId,
        department.groupId,
        department.name
      ]
      return _.compact(parts).join('+')
    }
  }
})()
