import angular from 'angular'

angular.module('odin.api').factory('ServiceProviderService', service)

service.$inject = ['$http', 'Route', '$rootScope']
function service($http, Route, $rootScope) {
  var url = Route.api('/service-providers')
  var service = { index, show, store, update, destroy }

  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }

  function store(serviceProvider) {
    return $http.post(url(), serviceProvider).then(response => {
      return response.data
    })
  }

  function show(serviceProviderId) {
    return $http
      .get(url(), { params: { serviceProviderId } })
      .then(response => response.data)
  }

  function update(serviceProviderId, serviceProvider) {
    return $http.put(url(), serviceProvider).then(response => {
      return response.data
    })
  }

  function destroy(serviceProviderId) {
    return $http
      .delete(url(), { params: { serviceProviderId } })
      .then(response => {
        return response.data
      })
  }
}
