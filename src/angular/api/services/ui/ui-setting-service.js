import angular from 'angular'
import _ from 'lodash'

angular.module('odin.api').factory('UiSettingService', UiSettingService)

UiSettingService.$inject = ['$http', 'Route', '$rootScope']
function UiSettingService($http, Route, $rootScope) {
console.log('ui-setting-service UISettingService');
  const url = Route.api('/ui/settings')
  let _data = {}
  const service = { load, data }
  $rootScope.$on('BrandingSettingService:updated', load)
  return service

  // get the UI settings and save in memory
  function load() {
    return $http.get(url()).then(response => {
      _data = _.isEmpty(response.data) ? {} : response.data
      $rootScope.$emit('Setting:updated')
    })
  }

  function data(property) {
    if (!property) return _data
    return _.get(_data, property)
  }
}
