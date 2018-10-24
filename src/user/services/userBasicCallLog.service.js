;(function() {
  angular
    .module('odin.user')
    .factory('UserBasicCallLogService', UserBasicCallLogService)

  function UserBasicCallLogService($http, Route, CacheFactory) {
    var service = { show: show }
    var url = Route.api('/users/basic-call-logs')
    var cache = CacheFactory('UserBasicCallLogService', {
      maxAge: 5 * 60 * 1000
    })
    return service

    function show(userId, noCache) {
      if (noCache) cache.remove(url(userId))
      return $http
        .get(url(), { params: { userId: userId }, cache: cache })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
