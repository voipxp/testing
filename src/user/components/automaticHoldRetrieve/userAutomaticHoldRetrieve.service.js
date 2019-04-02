;(function() {
  angular
    .module('odin.user')
    .factory(
      'UserAutomaticHoldRetrieveService',
      UserAutomaticHoldRetrieveService
    )

  function UserAutomaticHoldRetrieveService($http, Route, CacheFactory) {
    var url = Route.api('/users/automatic-hold-retrieve')
    var service = { show: show, update: update, index: index }
    service.options = {
      recallTimerSeconds: { minimum: 6, maximum: 600 }
    }
    var cache = CacheFactory('UserAutomaticHoldRetrieveService')
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url('bulk'), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }

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
