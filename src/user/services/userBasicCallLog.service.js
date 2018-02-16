;(function() {
  angular
    .module('odin.user')
    .factory('UserBasicCallLogService', UserBasicCallLogService)

  function UserBasicCallLogService($http, Route, CacheFactory) {
    var service = { show: show }
    var path = Route.api('services', 'users', 'basiccalllogs')
    var cache = CacheFactory('UserBasicCallLogService', {
      maxAge: 5 * 60 * 1000
    })
    return service

    function url(id) {
      return path(id)
    }

    function show(userId, noCache) {
      if (noCache) cache.remove(url(userId))
      return $http.get(url(userId), { cache: cache }).then(function(response) {
        return response.data
      })
    }
  }
})()
