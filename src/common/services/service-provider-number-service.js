import angular from 'angular'

angular
  .module('odin.common')
  .factory('ServiceProviderNumberService', ServiceProviderNumberService)

ServiceProviderNumberService.$inject = ['$http', 'Route']
function ServiceProviderNumberService($http, Route) {
  var service = { index, store, destroy }
  var url = Route.api('/service-providers/dns')
  return service

  // activated, summary, default
  function index(serviceProviderId, q) {
    return $http
      .get(url(), { params: { serviceProviderId, q } })
      .then(response => response.data)
  }

  function store(serviceProviderId, dns) {
    return $http
      .post(url(), { serviceProviderId, dns })
      .then(response => response.data)
  }

  function destroy(serviceProviderId, dns) {
    return $http
      .delete(url(), { data: { serviceProviderId, dns } })
      .then(response => response.data)
  }
}
