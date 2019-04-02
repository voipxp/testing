;(function() {
  angular
    .module('odin.user')
    .factory('UserRemoteOfficeService', UserRemoteOfficeService)

  function UserRemoteOfficeService($http, Route, CacheFactory) {
    var url = Route.api('/users/remote-office')
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

    function update(userId, object) {
      return $http.put(url(), object).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }
  }
})()
