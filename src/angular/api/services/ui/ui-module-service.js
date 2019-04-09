import angular from 'angular'

angular.module('odin.api').factory('UiModuleService', UiModuleService)

UiModuleService.$inject = ['$http', 'Route', 'CacheFactory', '$rootScope']
function UiModuleService($http, Route, CacheFactory, $rootScope) {
  const service = { index }
  const route = Route.api('/ui/modules')
  const cache = CacheFactory('UiModuleService')
  const clearCache = () => cache.removeAll()
  $rootScope.$on('BrandingHostnameService:updated', clearCache)
  $rootScope.$on('BrandingModuleService:updated', clearCache)
  return service

  function index() {
    return $http.get(route(), { cache })
  }
}
