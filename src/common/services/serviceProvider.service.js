;(function() {
  angular
    .module('odin.common')
    .factory('ServiceProviderService', ServiceProviderService)

  function ServiceProviderService($http, Route, CacheFactory) {
    var url = Route.api('serviceproviders')
    var service = {
      index: index,
      show: show,
      store: store,
      update: update,
      destroy: destroy
    }
    var cache = CacheFactory('ServiceProviderService')
    return service

    function index() {
      return $http.get(url(), { cache: cache }).then(function(response) {
        return response.data || []
      })
    }

    function store(serviceProvider) {
      return $http.post(url(), serviceProvider).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }

    function show(serviceProviderId) {
      return $http
        .get(url(serviceProviderId), { cache: cache })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, serviceProvider) {
      return $http
        .put(url(serviceProviderId), serviceProvider)
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }

    function destroy(serviceProviderId) {
      return $http.delete(url(serviceProviderId)).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }
  }
})()
