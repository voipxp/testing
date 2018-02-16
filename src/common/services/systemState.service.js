;(function() {
  angular
    .module('odin.common')
    .factory('SystemStateService', SystemStateService)

  function SystemStateService($http, CacheFactory, Route) {
    var url = Route.api('/system/statesprovinces')
    var cache = CacheFactory('SystemStateService')
    var service = { index: index }
    return service

    function index() {
      return $http.get(url(), { cache: cache }).then(function(response) {
        return response.data
      })
    }
  }
})()
