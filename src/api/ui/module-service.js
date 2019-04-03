import angular from 'angular'

angular.module('odin.api').factory('ModuleService', ModuleService)

ModuleService.$inject = ['$http', 'Route', 'CacheFactory', '$rootScope']
function ModuleService($http, Route, CacheFactory, $rootScope) {
  const service = { index }
  const route = Route.api('/ui/modules')
  const cache = CacheFactory('Module')
  const clearCache = () => cache.removeAll()
  $rootScope.$on('BrandingHostnameService:updated', clearCache)
  $rootScope.$on('BrandingModuleService:updated', clearCache)
  return service

  function index() {
    return $http.get(route(), { cache })
  }
}
