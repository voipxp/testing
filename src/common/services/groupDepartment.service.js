;(function() {
  angular
    .module('odin.common')
    .factory('GroupDepartmentService', GroupDepartmentService)

  function GroupDepartmentService($http, CacheFactory, Route) {
    var cache = CacheFactory('GroupDepartmentService')
    var service = { index, store, show, update, destroy }
    var url = Route.api2('/groups/departments')
    return service

    function index(serviceProviderId, groupId, includeEnterprise) {
      return $http
        .get(url(), {
          cache,
          params: { serviceProviderId, groupId, includeEnterprise }
        })
        .then(res => res.data)
    }

    function store(serviceProviderId, groupId, object) {
      return $http.post(url(), object).then(res => {
        cache.removeAll()
        return res.data
      })
    }

    function show(serviceProviderId, groupId, name) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId, name } })
        .then(res => res.data)
    }

    function update(department) {
      return $http.put(url(), department).then(res => {
        cache.removeAll()
        return res.data
      })
    }

    function destroy(serviceProviderId, groupId, name) {
      return $http
        .delete(url(), { params: { serviceProviderId, groupId, name } })
        .then(res => {
          cache.removeAll()
          return res.data
        })
    }
  }
})()
