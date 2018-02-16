;(function() {
  angular.module('odin.user').factory('UserPhoneDirectoryService', Service)

  function Service($http, Route) {
    var service = { show: show }
    return service

    function url(userId) {
      return Route.api('users', userId, 'phonedirectory')()
    }

    function show(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }
  }
})()
