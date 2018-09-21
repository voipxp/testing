;(function() {
  angular.module('odin.user').factory('UserPrivacyService', Service)

  function Service($http, Route) {
    var service = { available: available, show: show, update: update }
    return service

    function url(extra) {
      return Route.api2('services', 'users', 'privacy')(extra)
    }

    function available(userId) {
      return $http
        .get(url('monitors'), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(data) {
      return $http.put(url(), data).then(function(response) {
        return response.data
      })
    }
  }
})()
