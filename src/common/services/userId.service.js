;(function() {
  angular.module('odin.common').factory('UserIdService', UserIdService)

  function UserIdService($http, Route) {
    var service = { update: update }

    return service

    function url(userId) {
      return Route.api('users')(userId, 'userid')
    }

    function update(userId, newUserId) {
      var data = { userId: userId, newUserId: newUserId }
      return $http.put(url(userId), data).then(function(response) {
        return response.data
      })
    }
  }
})()
