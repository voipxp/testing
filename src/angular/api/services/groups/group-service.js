import angular from 'angular'

angular.module('odin.api').factory('GroupService', GroupService)

GroupService.$inject = ['$http', 'Route', '$rootScope']
function GroupService($http, Route, $rootScope) {
  var service = { index, store, show, update, destroy }
  var url = Route.api('/groups')

  return service

  function index(serviceProviderId) {
    return $http
      .get(url(), { params: { serviceProviderId } })
      .then(response => response.data)
  }

  function store(serviceProviderId, group) {
    return $http.post(url(), group).then(response => {
      return response.data
    })
  }

  function show(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function update(serviceProviderId, group) {
    return $http.put(url(), group).then(response => {
      return response.data
    })
  }

  function destroy(serviceProviderId, groupId) {
    return $http
      .delete(url(), { params: { serviceProviderId, groupId } })
      .then(response => {
        return response.data
      })
  }
}
