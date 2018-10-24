;(function() {
  angular.module('odin.user').factory('UserDoNotDisturbService', Controller)

  function Controller($http, Route, CacheFactory) {
    var url = Route.api('/users/do-not-disturb')
    var service = {
      show: show,
      update: update
    }
    var cache = CacheFactory('UserDoNotDisturbService')
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
