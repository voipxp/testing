;(function() {
  angular
    .module('odin.user')
    .factory('UserHotelingGuestService', UserHotelingGuestService)

  function UserHotelingGuestService($http, Route) {
    var url = Route.api2('/users/hoteling-guest')
    var service = { show: show, update: update, index: index, bulk: bulk }
    service.options = {
      minAssociationLimitHours: 1,
      maxAssociationLimitHours: 999
    }
    return service

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function index(userId) {
      return $http
        .get(url('users'), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }

    function bulk(data) {
      return $http.put(url('bulk'), data).then(function(response) {
        return response.data
      })
    }
  }
})()
