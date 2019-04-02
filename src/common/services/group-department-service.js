import angular from 'angular'

angular
  .module('odin.common')
  .factory('GroupDepartmentService', GroupDepartmentService)

GroupDepartmentService.$inject = ['$http', 'CacheFactory', 'Route']
function GroupDepartmentService($http, CacheFactory, Route) {
  var cache = CacheFactory('GroupDepartmentService')
  var service = { index, store, show, update, destroy }
  var url = Route.api('/groups/departments')
  return service

  function index(serviceProviderId, groupId, includeEnterprise) {
    return $http
      .get(url(), {
        cache,
        params: { serviceProviderId, groupId, includeEnterprise }
      })
      .then(response => response.data)
  }

  function store(serviceProviderId, groupId, object) {
    return $http.post(url(), object).then(response => {
      cache.removeAll()
      return response.data
    })
  }

  function show(serviceProviderId, groupId, name) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId, name } })
      .then(response => response.data)
  }

  function update(department) {
    return $http.put(url(), department).then(response => {
      cache.removeAll()
      return response.data
    })
  }

  function destroy(serviceProviderId, groupId, name) {
    return $http
      .delete(url(), { params: { serviceProviderId, groupId, name } })
      .then(response => {
        cache.removeAll()
        return response.data
      })
  }
}
