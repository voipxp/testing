import angular from 'angular'

angular
  .module('odin.api')
  .factory('SystemLanguageService', SystemLanguageService)

SystemLanguageService.$inject = ['$http', 'Route']
function SystemLanguageService($http, Route) {
  var url = Route.api('/system/languages')
  var service = { index }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }
}
