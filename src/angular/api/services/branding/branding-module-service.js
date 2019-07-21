import angular from 'angular'

angular
  .module('odin.api')
  .factory('BrandingModuleService', BrandingModuleService)

BrandingModuleService.$inject = ['$http', 'Route', '$rootScope', '$ngRedux']
function BrandingModuleService($http, Route, $rootScope, $ngRedux) {
  var service = { index, show, update }
  var url = Route.api('/branding/modules')
  return service

  function index(hostnameId) {
    return $http
      .get(url(), { params: { hostnameId } })
      .then(response => response.data)
  }

  function show(hostnameId, id) {
    return $http
      .get(url(), { params: { hostnameId, id } })
      .then(response => response.data)
  }

  function update(module) {
    return $http.put(url(), module).then(response => {
      $rootScope.$emit('BrandingModuleService:updated')
      return response.data
    })
  }
}
