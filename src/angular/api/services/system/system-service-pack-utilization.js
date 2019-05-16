import angular from 'angular'

angular.module('odin.api').factory('SystemServicePackUtilization', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/system/service-packs')
  var service = { index }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }
}
