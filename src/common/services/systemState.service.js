;(function() {
  angular.module('odin.common').factory('SystemStateService', Service)

  function Service($http, CacheFactory, Route) {
    var url = Route.api('/system/states-provinces')
    var cache = CacheFactory('SystemStateService')
    var service = { index }
    return service

    function index() {
      return $http.get(url(), { cache }).then(res => res.data)
    }
  }
})()
