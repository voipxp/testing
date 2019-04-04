import angular from 'angular'

angular.module('odin.api').factory('SystemDeviceTypeService', Service)

Service.$inject = ['$http', 'CacheFactory', 'Route']
function Service($http, CacheFactory, Route) {
  var cache = CacheFactory('SystemDeviceTypeService')
  var service = { index }
  var url = Route.api('/system/device-types')
  return service

  function index() {
    return $http.get(url(), { cache }).then(response => response.data)
  }
}
