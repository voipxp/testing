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
      destroy: destroy
    }
    var url = Route.api2('/groups/departments')
    return service

    function index(serviceProviderId, groupId, includeEnterprise) {
      return $http
        .get(url(), {
          cache: cache,
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId,
            includeEnterprise: includeEnterprise
          }
        })
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, object) {
      return $http.post(url(), object).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }

    function show(serviceProviderId, groupId, name) {
      return $http
        .get(url(), {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId,
            name: name
          }
        })
        .then(function(response) {
          return response.data
        })
    }

    function update(department) {
      return $http.put(url(), department).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }

    function destroy(serviceProviderId, groupId, name) {
      return $http
        .delete(url(), {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId,
            name: name
          }
        })
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }
  }
})()
