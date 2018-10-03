;(function() {
  angular
    .module('odin.user')
    .factory('UserRemoteOfficeService', UserRemoteOfficeService)

  function UserRemoteOfficeService($http, Route, CacheFactory) {
    var url = Route.api2('/users/remote-office')
    var service = { show: show, update: update }
    var cache = CacheFactory('UserRemoteOfficeService')
    return service

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId }, cache: cache })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }
  }
})()
