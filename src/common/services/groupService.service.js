;(function() {
  angular
    .module('odin.common')
    .factory('GroupServiceService', GroupServiceService)

  function GroupServiceService($http, Route, CacheFactory, $rootScope) {
    var service = { show: show, available: available, update: update }
    var cache = CacheFactory('GroupServiceService')

    $rootScope.$on('ServiceProviderServiceService:updated', clearCache)
    $rootScope.$on('BrandingModuleService:updated', clearCache)
    $rootScope.$on('ReplicateGroupServiceService:store', clearCache)

    return service

    function clearCache() {
      cache.removeAll()
    }

    function url(serviceProviderId, groupId, extra) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('services', extra)
    }

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId), { cache: cache })
        .then(function(response) {
          return response.data
        })
    }

    // map this into an easy to access hash
    function available(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId, 'available'), { cache: cache })
        .then(function(response) {
          return response.data
        })
        .then(function(services) {
          var results = {}
          services.forEach(function(service) {
            results[service] = true
          })
          return results
        })
    }

    function update(serviceProviderId, groupId, service) {
      return $http
        .put(url(serviceProviderId, groupId), service)
        .then(function(response) {
          cache.removeAll()
          $rootScope.$emit('GroupServiceService:updated')
          return response.data
        })
    }
  }
})()
