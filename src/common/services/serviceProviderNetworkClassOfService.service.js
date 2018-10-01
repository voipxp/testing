;(function() {
  angular
    .module('odin.common')
    .factory('ServiceProviderNetworkClassOfServiceService', Service)

  function Service($http, CacheFactory, Route) {
    var cache = CacheFactory('ServiceProviderNetworkClassOfServiceService')
    var url = Route.api2('/service-providers/network-class-of-services')
    var service = { show: show, select: select, update: update }
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

    function update(serviceProviderId, services) {
      return $http
        .put(url(), {
          serviceProviderId: serviceProviderId,
          services: services
        })
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }
  }
})()
