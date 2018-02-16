;(function() {
  angular
    .module('odin.common')
    .factory('ServiceProviderNumberService', ServiceProviderNumberService)

  function ServiceProviderNumberService($http, Route) {
    var service = { index: index, store: store, destroy: destroy }
    return service

    function url(serviceProviderId) {
      return Route.api('serviceproviders', serviceProviderId)('dns')
    }

    // activated, summary, default
    function index(serviceProviderId, query) {
      return $http
        .get(url(serviceProviderId), { params: { q: query } })
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, dns) {
      return $http.post(url(serviceProviderId), dns).then(function(response) {
        return response.data
      })
    }

    function destroy(serviceProviderId, dns) {
      return $http
        .delete(url(serviceProviderId), { data: dns })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
