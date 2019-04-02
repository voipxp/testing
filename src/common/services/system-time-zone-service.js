import angular from 'angular'

angular.module('odin.common').factory('SystemTimeZoneService', Service)

Service.$inject = ['$http', 'CacheFactory', 'Route']
function Service($http, CacheFactory, Route) {
  var url = Route.api('/system/time-zones')
  var cache = CacheFactory('SystemTimeZoneService')
  var service = { index }
  return service

  function index() {
    return $http.get(url(), { cache }).then(response => response.data)
  }
}
