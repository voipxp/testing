import angular from 'angular'

angular.module('odin.api').factory('GroupServiceService', Service)

Service.$inject = ['$http', 'Route', 'CacheFactory', '$rootScope']
function Service($http, Route, CacheFactory, $rootScope) {
  var service = { show, authorized, available, update, assigned }
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
      .then(response => response.data)
  }

  // map this into an easy to access hash
  function available(serviceProviderId, groupId) {
    return $http
      .get(url('available'), {
        cache,
        params: { serviceProviderId, groupId }
      })
      .then(response => response.data)
      .then(services => {
        var results = {}
        services.forEach(function(service) {
          results[service] = true
        })
        return results
      })
  }
  function assigned(serviceProviderId, groupId, serviceType, serviceName) {
    return $http
      .get(url('assigned'), {
        cache,
        params: { serviceProviderId, groupId, serviceType, serviceName }
      })
      .then(response => response.data)
  }
  function authorized(serviceProviderId, groupId) {
    return $http
      .get(url('authorized'), {
        cache,
        params: { serviceProviderId, groupId }
      })
      .then(response => response.data)
  }

  function update(serviceProviderId, groupId, service) {
    return $http
      .put(url(), { ...service, serviceProviderId, groupId })
      .then(response => {
        cache.removeAll()
        $rootScope.$emit('GroupServiceService:updated')
        return response.data
      })
  }
}
