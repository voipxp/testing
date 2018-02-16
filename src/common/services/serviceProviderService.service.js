;(function() {
  angular
    .module('odin.common')
    .factory('ServiceProviderServiceService', ServiceProviderServiceService)

  function ServiceProviderServiceService($http, Route, CacheFactory) {
    var service = { show: show, assignable: assignable, update: update }
    var cache = CacheFactory('ServiceProviderServiceService')
    return service

    function url(serviceProviderId, action) {
      return Route.api('serviceproviders', serviceProviderId)(
        'services',
        action
      )
    }

    function show(serviceProviderId) {
      return $http
        .get(url(serviceProviderId), { cache: cache })
        .then(function(response) {
          return response.data
        })
    }

    function assignable(serviceProviderId) {
      return $http
        .get(url(serviceProviderId, 'assignable'), { cache: cache })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, services) {
      return $http
        .put(url(serviceProviderId), services)
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }
  }
})()
