import angular from 'angular'
import _ from 'lodash'

angular.module('odin.api').factory('UiEmailService', UiEmailService)

UiEmailService.$inject = ['$http', 'Route', '$rootScope']
function UiEmailService($http, Route, $rootScope) {
console.log('ui-email-service UIEmailService');
  const url = Route.api('/ui/emails')
  let _data = {}
  const service = { load, data }
  $rootScope.$on('BrandingEmailService:updated', load)
  return service

  // get the UI email and save in memory
  function load() {
    return $http.get(url()).then(response => {
      _data = _.isEmpty(response.data) ? {} : response.data
      $rootScope.$emit('Email:updated')
    })
  }

  function data(property) {
    if (!property) return _data
    return _.get(_data, property)
  }
}
