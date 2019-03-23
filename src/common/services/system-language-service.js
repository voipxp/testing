import angular from 'angular'

angular
  .module('odin.common')
  .factory('SystemLanguageService', SystemLanguageService)

SystemLanguageService.$inject = ['$http', 'CacheFactory', 'Route']
function SystemLanguageService($http, CacheFactory, Route) {
  var url = Route.api('/system/languages')
  var cache = CacheFactory('SystemLanguageService')
  var service = { index }
  return service

  function index() {
    return $http.get(url(), { cache }).then(res => res.data)
  }
}
