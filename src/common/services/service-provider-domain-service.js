import angular from 'angular'

angular
  .module('odin.common')
  .factory('ServiceProviderDomainService', ServiceProviderDomainService)

ServiceProviderDomainService.$inject = ['$http', 'CacheFactory', 'Route']
function ServiceProviderDomainService($http, CacheFactory, Route) {
  var cache = CacheFactory('ServiceProviderDomainService')
  var url = Route.api('/service-providers/domains')
  var service = { index }
  return service

  function index(serviceProviderId) {
    return $http
      .get(url(), { params: { serviceProviderId }, cache })
      .then(res => res.data)
  }
}
