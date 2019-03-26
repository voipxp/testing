;(function() {
  angular
    .module('odin.user')
    .factory('UserFlexibleSeatingGuestService', Controller)

  function Controller($http, Route) {
    var url = Route.api('/users/flexible-seating/guest')
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

    function update(obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
