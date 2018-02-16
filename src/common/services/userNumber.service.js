;(function() {
  angular.module('odin.common').factory('UserNumberService', UserNumberService)

  function UserNumberService($http, Route) {
    var service = { index: index }
    return service

    function url(userId) {
      return Route.api('users', userId)('dns')
    }

    function index(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }
  }
})()
