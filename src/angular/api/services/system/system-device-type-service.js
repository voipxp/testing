import angular from 'angular'

angular.module('odin.api').factory('SystemDeviceTypeService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index }
  var url = Route.api('/system/device-types')
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }
}
