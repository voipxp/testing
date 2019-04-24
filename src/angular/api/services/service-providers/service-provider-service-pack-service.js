import angular from 'angular'

angular.module('odin.api').factory('ServiceProviderServicePackService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/service-providers/service-packs')
  var service = { index, create, show, update, destroy, usage }
  return service

  function index(serviceProviderId, includeUtilization) {
    return $http
      .get(url(), { params: { serviceProviderId, includeUtilization } })
      .then(response => response.data)
  }

  function create(serviceProviderId, object) {
    return $http.post(url(), object).then(response => response.data)
  }

  function show(serviceProviderId, servicePackName) {
    return $http
      .get(url(), { params: { serviceProviderId, servicePackName } })
      .then(response => response.data)
  }

  function update(serviceProviderId, servicePackName, object) {
    return $http.put(url(), object).then(response => response.data)
  }

  function destroy(serviceProviderId, servicePackName) {
    return $http
      .delete(url(), { params: { serviceProviderId, servicePackName } })
      .then(response => response.data)
  }

  function usage(serviceProviderId, serviceName) {
    return $http
      .get(url('usage'), { params: { serviceProviderId, serviceName } })
      .then(response => response.data)
  }
}
