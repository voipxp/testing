;(function() {
  angular
    .module('odin.common')
    .factory('ServiceProviderServiceService', ServiceProviderServiceService)

  function ServiceProviderServiceService(
    $http,
    Route,
    CacheFactory,
    $rootScope
  ) {
    var service = { show, assignable, update }
    var cache = CacheFactory('ServiceProviderServiceService')
    var url = Route.api2('/service-providers/services')
    $rootScope.$on('BrandingModuleService:updated', clearCache)
    return service

    function clearCache() {
      cache.removeAll()
    }

    function show(serviceProviderId) {
      return $http
        .get(url(), { params: { serviceProviderId }, cache })
        .then(res => res.data)
    }

    function assignable(serviceProviderId) {
      return $http
        .get(url('assignable'), { params: { serviceProviderId }, cache })
        .then(res => res.data)
    }

    function update(serviceProviderId, services) {
      return $http.put(url(), { ...services, serviceProviderId }).then(res => {
        cache.removeAll()
        $rootScope.$emit('ServiceProviderServiceService:updated')
        return res.data
      })
    }
  }
})()
