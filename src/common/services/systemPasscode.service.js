;(function() {
  angular
    .module('odin.common')
    .factory('SystemPasscodeService', SystemPasscodeService)

  function SystemPasscodeService($http, Route, CacheFactory) {
    var cache = CacheFactory('SystemPasscodeService')
    var url = Route.api('/system/passcode-rules')
    var service = { show: show, update: update }
    return service

    function show() {
      return $http.get(url(), { cache: cache }).then(res => res.data)
    }

    function update(obj) {
      return $http.put(url(), obj).then(res => res.data)
    }
  }
})()
