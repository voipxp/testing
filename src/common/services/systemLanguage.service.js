;(function() {
  angular
    .module('odin.common')
    .factory('SystemLanguageService', SystemLanguageService)

  function SystemLanguageService($http, CacheFactory, Route) {
    var url = Route.api('/system/languages')
    var cache = CacheFactory('SystemLanguageService')
    var service = { index }
    return service

    function index() {
      return $http.get(url(), { cache }).then(res => res.data)
    }
  }
})()
