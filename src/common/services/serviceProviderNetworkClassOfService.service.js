;(function() {
  angular
    .module('odin.common')
    .factory('ServiceProviderNetworkClassOfServiceService', Service)

  function Service($http, CacheFactory, Route) {
    var cache = CacheFactory('ServiceProviderNetworkClassOfServiceService')
    var url = Route.api(
      'services',
      'serviceproviders',
      'networkclassofservices'
    )
    var service = { show: show, select: select }
    return service

    function show(serviceProviderId) {
      return $http
        .get(url(), {
          cache: cache,
          params: { serviceProviderId: serviceProviderId }
        })
        .then(function(response) {
          return response.data
        })
    }

    function select(serviceProviderId, name) {
      return $http
        .post(url(), {
          serviceProviderId: serviceProviderId,
          name: name
        })
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }
  }
})()
