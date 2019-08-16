import angular from 'angular'

angular.module('odin.api').factory('GroupDepartmentService', GroupDepartmentService)

GroupDepartmentService.$inject = ['$http', 'Route']
function GroupDepartmentService($http, Route) {
  var service = { index, store, show, update, destroy }
  var url = Route.api('/groups/departments')
  return service

  function index(serviceProviderId, groupId, includeEnterprise) {
    return $http
      .get(url(), {
        params: { serviceProviderId, groupId, includeEnterprise }
      })
      .then(response => response.data)
  }

  function store(serviceProviderId, groupId, object) {
    return $http.post(url(), object).then(response => {
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
      return response.data
    })
  }

  function destroy(serviceProviderId, groupId, name) {
    return $http.delete(url(), { params: { serviceProviderId, groupId, name } }).then(response => {
      return response.data
    })
  }
}
