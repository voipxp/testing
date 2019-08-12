import angular from 'angular'

angular
  .module('odin.api')
  .factory('ServiceProviderDomainService', ServiceProviderDomainService)

ServiceProviderDomainService.$inject = ['$http', 'Route']
function ServiceProviderDomainService($http, Route) {
  var url = Route.api('/service-providers/domains')
  var service = { index }
  return service

  function index(serviceProviderId) {
    return $http
      .get(url(), { params: { serviceProviderId } })
      .then(response => response.data)
  }
}
