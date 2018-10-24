;(function() {
  angular.module('odin.common').factory('GroupServiceService', Service)

  function Service($http, Route, CacheFactory, $rootScope) {
    var service = { show, authorized, available, update }
    var url = Route.api('/groups/services')
    var cache = CacheFactory('GroupServiceService')

    $rootScope.$on('ServiceProviderServiceService:updated', clearCache)
    $rootScope.$on('BrandingModuleService:updated', clearCache)
    $rootScope.$on('GroupServiceService:updated', clearCache)

    return service

    function clearCache() {
      cache.removeAll()
    }

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(), { cache, params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    // map this into an easy to access hash
    function available(serviceProviderId, groupId) {
      return $http
        .get(url('available'), {
          cache,
          params: { serviceProviderId, groupId }
        })
        .then(res => res.data)
        .then(services => {
          var results = {}
          services.forEach(function(service) {
            results[service] = true
          })
          return results
        })
    }

    function authorized(serviceProviderId, groupId) {
      return $http
        .get(url('authorized'), {
          cache,
          params: { serviceProviderId, groupId }
        })
        .then(res => res.data)
    }

    function update(serviceProviderId, groupId, service) {
      return $http
        .put(url(), { ...service, serviceProviderId, groupId })
        .then(res => {
          cache.removeAll()
          $rootScope.$emit('GroupServiceService:updated')
          return res.data
        })
    }
  }
})()
