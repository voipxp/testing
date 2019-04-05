import angular from 'angular'

angular
  .module('odin.api')
  .factory('SystemLanguageService', SystemLanguageService)

SystemLanguageService.$inject = ['$http', 'CacheFactory', 'Route']
function SystemLanguageService($http, CacheFactory, Route) {
  var url = Route.api('/system/languages')
  var cache = CacheFactory('SystemLanguageService')
  var service = { index }
  return service

  function index() {
    return $http.get(url(), { cache }).then(response => response.data)
  }
}