;(function() {
  angular
    .module('odin.user')
    .factory(
      'UserAutomaticHoldRetrieveService',
      UserAutomaticHoldRetrieveService
    )

  function UserAutomaticHoldRetrieveService($http, Route, CacheFactory) {
    var url = Route.api2('/users/automatic-hold-retrieve')
    var service = { show: show, update: update }
    service.options = {
      recallTimerSeconds: { minimum: 6, maximum: 600 }
    }
    var cache = CacheFactory('UserAutomaticHoldRetrieveService')
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
