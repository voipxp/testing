;(function() {
  angular.module('odin.user').factory('UserPrivacyService', Service)

  function Service($http, Route) {
    var service = { available: available, show: show, update: update }
    return service

    function url(userId, extra) {
      return Route.api('services', 'users', 'privacy')(userId, extra)
    }

    function available(userId) {
      return $http.get(url(userId, 'available')).then(function(response) {
        return response.data
      })
    }

    function show(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, data) {
      return $http.put(url(userId), data).then(function(response) {
        return response.data
      })
    }
  }
})()
