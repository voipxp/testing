;(function() {
  angular.module('odin.common').factory('UserIdService', UserIdService)

  function UserIdService($http, Route) {
    var service = { update }
    var url = Route.api('/users/user-id')
    return service

    function update(userId, newUserId) {
      return $http.put(url(), { userId, newUserId }).then(res => res.data)
    }
  }
})()
