import angular from 'angular'

angular.module('odin.system').factory('SystemLicensingService', service)

service.$inject = ['$http', 'Route']
function service($http, Route) {
  var url = Route.api('/system/licensing')
  var service = { show }
  return service

  function show() {
    return $http.get(url()).then(response => response.data)
  }
}
