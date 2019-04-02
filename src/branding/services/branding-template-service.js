import angular from 'angular'

angular
  .module('odin.branding')
  .factory('BrandingTemplateService', BrandingTemplateService)

BrandingTemplateService.$inject = ['$http', 'Route', '$rootScope']
function BrandingTemplateService($http, Route, $rootScope) {
  var service = { show, update }
  var url = Route.api('/branding/templates')
  return service

  function show(hostnameId) {
    return $http
      .get(url(), { params: { hostnameId } })
      .then(response => response.data)
  }

  function update(template) {
    return $http.put(url(), template).then(response => {
      $rootScope.$emit('BrandingTemplateService:updated')
      return response.data
    })
  }
}
