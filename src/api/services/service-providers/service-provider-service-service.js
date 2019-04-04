import angular from 'angular'

angular.module('odin.api').factory('ServiceProviderServiceService', service)

service.$inject = ['$http', 'Route', 'CacheFactory', '$rootScope']
function service($http, Route, CacheFactory, $rootScope) {
  var service = { show, assignable, update }
  var cache = CacheFactory('ServiceProviderServiceService')
  var url = Route.api('/service-providers/services')
  $rootScope.$on('BrandingModuleService:updated', clearCache)
  return service

  function clearCache() {
    cache.removeAll()
  }

  function show(serviceProviderId) {
    return $http
      .get(url(), { params: { serviceProviderId }, cache })
      .then(response => response.data)
  }

  function assignable(serviceProviderId) {
    return $http
      .get(url('assignable'), { params: { serviceProviderId }, cache })
      .then(response => response.data)
  }

  function update(serviceProviderId, services) {
    return $http
      .put(url(), { ...services, serviceProviderId })
      .then(response => {
        cache.removeAll()
        $rootScope.$emit('ServiceProviderServiceService:updated')
        return response.data
      })
  }
}
