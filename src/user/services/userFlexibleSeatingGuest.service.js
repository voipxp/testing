;(function() {
  angular
    .module('odin.user')
    .factory('UserFlexibleSeatingGuestService', UserFlexibleSeatingGuestService)

  function UserFlexibleSeatingGuestService($http, Route) {
    var url = Route.api('/users/flexible-seating')

    var service = {
      show: show,
      update: update
    }

    service.options = {}
    return service

    function show(userId) {
      return $http
        .get(url('guest'), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(obj) {
      return $http.put(url('guest'), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
