import angular from 'angular'

angular
  .module('odin.branding')
  .factory('BrandingModuleService', BrandingModuleService)

BrandingModuleService.$inject = ['$http', 'Route', '$rootScope']
function BrandingModuleService($http, Route, $rootScope) {
  var service = { index, show, update }
  var url = Route.api('/branding/modules')
  return service

  function index(hostnameId) {
    return $http.get(url(), { params: { hostnameId } }).then(res => res.data)
  }

  function show(hostnameId, id) {
    return $http
      .get(url(), { params: { hostnameId, id } })
      .then(res => res.data)
  }

  function update(module) {
    return $http.put(url(), module).then(res => {
      $rootScope.$emit('BrandingModuleService:updated')
      return res.data
    })
  }
}
