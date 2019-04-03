import angular from 'angular'
import _ from 'lodash'

angular.module('odin.api').factory('UiTemplateService', UiTemplateService)

UiTemplateService.$inject = ['$http', 'Route', '$rootScope']
function UiTemplateService($http, Route, $rootScope) {
  const url = Route.api('/ui/templates')
  let _data = {}
  const service = { load, data }
  $rootScope.$on('BrandingTemplateService:updated', load)
  return service

  // get the UI template and save in memory
  function load() {
    return $http.get(url()).then(response => {
      _data = response.data || {}
      $rootScope.$emit('Template:updated')
    })
  }

  function data(property) {
    if (!property) return _data
    return _.get(_data, property)
  }
}
