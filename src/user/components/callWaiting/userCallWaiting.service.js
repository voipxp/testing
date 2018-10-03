;(function() {
  angular.module('odin.user').factory('UserCallWaitingService', Controller)

  function Controller($http, Route) {
    var url = Route.api2('/users/call-waiting')
    var service = {
      show: show,
      update: update
    }

    return service

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
