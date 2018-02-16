;(function() {
  angular
    .module('odin.common')
    .factory('ServiceProviderDomainService', ServiceProviderDomainService)

  function ServiceProviderDomainService($http, CacheFactory, Route) {
    var cache = CacheFactory('ServiceProviderDomainService')
    var service = { index: index }
    return service

    function url(serviceProviderId) {
      return Route.api('serviceproviders', serviceProviderId)('domains')
    }

    function index(serviceProviderId) {
      return $http
        .get(url(serviceProviderId), { cache: cache })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
