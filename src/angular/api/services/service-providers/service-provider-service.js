import angular from 'angular'

angular.module('odin.api').factory('ServiceProviderService', service)

service.$inject = ['$http', 'Route', '$rootScope', 'CacheFactory']
function service($http, Route, $rootScope, CacheFactory) {
  var url = Route.api('/service-providers')
  var service = { index, show, store, update, destroy }
  var cache = CacheFactory('ServiceProviderService')

  $rootScope.$on('ServiceProviderService:updated', clearCache)

  return service

  function clearCache() {
    cache.removeAll()
  }

  function index() {
    return $http.get(url(), { cache }).then(response => response.data)
  }

  function store(serviceProvider) {
    return $http.post(url(), serviceProvider).then(response => {
      clearCache()
      return response.data
    })
  }

  function show(serviceProviderId) {
    return $http
      .get(url(), { params: { serviceProviderId }, cache })
      .then(response => response.data)
  }

  function update(serviceProviderId, serviceProvider) {
    return $http.put(url(), serviceProvider).then(response => {
      clearCache()
      return response.data
    })
  }

  function destroy(serviceProviderId) {
    return $http
      .delete(url(), { params: { serviceProviderId } })
      .then(response => {
        clearCache()
        return response.data
      })
  }
}
