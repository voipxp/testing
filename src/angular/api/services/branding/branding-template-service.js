import angular from 'angular'
import { loadTemplate } from '@/store/ui-template'

angular
  .module('odin.api')
  .factory('BrandingTemplateService', BrandingTemplateService)

BrandingTemplateService.$inject = ['$http', 'Route', '$rootScope', '$ngRedux']
function BrandingTemplateService($http, Route, $rootScope, $ngRedux) {
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
      $ngRedux.dispatch(loadTemplate())
      $rootScope.$emit('BrandingTemplateService:updated')
      return response.data
    })
  }
}
