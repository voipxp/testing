import angular from 'angular'

angular.module('odin.api').factory('SystemCommunicationBarringProfileService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/system/communication-barring/profiles')
  var service = { index }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }
}
