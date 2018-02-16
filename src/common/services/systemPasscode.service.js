;(function() {
  angular
    .module('odin.common')
    .factory('SystemPasscodeService', SystemPasscodeService)

  function SystemPasscodeService($http, Route, CacheFactory) {
    var cache = CacheFactory('SystemPasscodeService')
    var url = Route.api('system', 'passcodes')
    var service = { show: show, update: update }
    return service

    function show() {
      return $http.get(url(), { cache: cache }).then(function(response) {
        return response.data
      })
    }

    function update(obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
