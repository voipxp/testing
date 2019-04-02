import angular from 'angular'
import _ from 'lodash'

angular
  .module('odin.branding')
  .factory('BrandingSettingService', BrandingSettingService)

BrandingSettingService.$inject = ['$http', 'Route', '$rootScope']
function BrandingSettingService($http, Route, $rootScope) {
  var service = { show, update }
  var url = Route.api('/branding/settings')
  return service

  function show(hostnameId) {
    return $http.get(url(), { params: { hostnameId } }).then(response => {
      return _.isEmpty(response.data) ? {} : response.data
    })
  }

  function update(template) {
    return $http.put(url(), template).then(response => {
      $rootScope.$emit('BrandingSettingService:updated')
      return response.data
    })
  }
}
